import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { betterAuth } from "convex-dev-better-auth";

// Better Auth API
export const { handleAuth, getSession } = betterAuth({});

// Helper to get current user from session
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const session = await getSession(ctx);
    if (!session) return null;
    return await ctx.db.get(session.userId as any);
  },
});

// Portfolio Queries - filtered by authenticated user
export const getUserPortfolios = query({
  args: {},
  handler: async (ctx) => {
    const session = await getSession(ctx);
    if (!session) return [];
    
    return await ctx.db
      .query("portfolios")
      .filter((q) => q.eq(q.field("userId"), session.userId))
      .collect();
  },
});

export const getPortfolioById = query({
  args: { portfolioId: v.id("portfolios") },
  handler: async (ctx, args) => {
    const session = await getSession(ctx);
    if (!session) throw new Error("Unauthorized");
    
    const portfolio = await ctx.db.get(args.portfolioId);
    if (!portfolio) return null;
    if (portfolio.userId !== session.userId) throw new Error("Forbidden");
    return portfolio;
  },
});

// Portfolio Mutations
export const createPortfolio = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const session = await getSession(ctx);
    if (!session) throw new Error("Unauthorized");
    
    return await ctx.db.insert("portfolios", {
      userId: session.userId,
      name: args.name,
      createdAt: Date.now(),
    });
  },
});

export const updatePortfolio = mutation({
  args: { portfolioId: v.id("portfolios"), name: v.string() },
  handler: async (ctx, args) => {
    const session = await getSession(ctx);
    if (!session) throw new Error("Unauthorized");
    
    const portfolio = await ctx.db.get(args.portfolioId);
    if (!portfolio || portfolio.userId !== session.userId) {
      throw new Error("Forbidden");
    }
    
    await ctx.db.patch(args.portfolioId, { name: args.name });
  },
});

export const deletePortfolio = mutation({
  args: { portfolioId: v.id("portfolios") },
  handler: async (ctx, args) => {
    const session = await getSession(ctx);
    if (!session) throw new Error("Unauthorized");
    
    const portfolio = await ctx.db.get(args.portfolioId);
    if (!portfolio || portfolio.userId !== session.userId) {
      throw new Error("Forbidden");
    }
    
    // Delete all holdings and transactions
    const holdings = await ctx.db
      .query("holdings")
      .filter((q) => q.eq(q.field("portfolioId"), args.portfolioId))
      .collect();
    for (const holding of holdings) {
      const transactions = await ctx.db
        .query("transactions")
        .filter((q) => q.eq(q.field("holdingId"), holding._id))
        .collect();
      for (const tx of transactions) await ctx.db.delete(tx._id);
      await ctx.db.delete(holding._id);
    }
    await ctx.db.delete(args.portfolioId);
  },
});

// Holdings Queries
export const getAllHoldings = query({
  args: {},
  handler: async (ctx) => {
    const session = await getSession(ctx);
    if (!session) throw new Error("Unauthorized");
    
    const portfolios = await ctx.db
      .query("portfolios")
      .filter((q) => q.eq(q.field("userId"), session.userId))
      .collect();
    
    const allHoldings: any[] = [];
    for (const portfolio of portfolios) {
      const holdings = await ctx.db
        .query("holdings")
        .filter((q) => q.eq(q.field("portfolioId"), portfolio._id))
        .collect();
      allHoldings.push(...holdings);
    }
    return allHoldings;
  },
});

// Holdings Mutations
export const createHolding = mutation({
  args: {
    portfolioId: v.id("portfolios"),
    symbol: v.string(),
    name: v.string(),
    type: v.string(),
    quantity: v.number(),
    avgBuyPrice: v.number(),
    currentPrice: v.number(),
    change24h: v.number(),
  },
  handler: async (ctx, args) => {
    const session = await getSession(ctx);
    if (!session) throw new Error("Unauthorized");
    
    const portfolio = await ctx.db.get(args.portfolioId);
    if (!portfolio || portfolio.userId !== session.userId) {
      throw new Error("Forbidden");
    }
    
    return await ctx.db.insert("holdings", {
      portfolioId: args.portfolioId,
      symbol: args.symbol,
      name: args.name,
      type: args.type,
      quantity: args.quantity,
      avgBuyPrice: args.avgBuyPrice,
      currentPrice: args.currentPrice,
      change24h: args.change24h,
      createdAt: Date.now(),
    });
  },
});

export const updateHolding = mutation({
  args: {
    holdingId: v.id("holdings"),
    currentPrice: v.optional(v.number()),
    change24h: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const session = await getSession(ctx);
    if (!session) throw new Error("Unauthorized");
    
    const holding = await ctx.db.get(args.holdingId);
    if (!holding) throw new Error("Not found");
    
    const portfolio = await ctx.db.get(holding.portfolioId);
    if (!portfolio || portfolio.userId !== session.userId) {
      throw new Error("Forbidden");
    }
    
    const updates: Record<string, unknown> = {};
    if (args.currentPrice !== undefined) updates.currentPrice = args.currentPrice;
    if (args.change24h !== undefined) updates.change24h = args.change24h;
    await ctx.db.patch(args.holdingId, updates);
  },
});

export const deleteHolding = mutation({
  args: { holdingId: v.id("holdings") },
  handler: async (ctx, args) => {
    const session = await getSession(ctx);
    if (!session) throw new Error("Unauthorized");
    
    const holding = await ctx.db.get(args.holdingId);
    if (!holding) throw new Error("Not found");
    
    const portfolio = await ctx.db.get(holding.portfolioId);
    if (!portfolio || portfolio.userId !== session.userId) {
      throw new Error("Forbidden");
    }
    
    const transactions = await ctx.db
      .query("transactions")
      .filter((q) => q.eq(q.field("holdingId"), args.holdingId))
      .collect();
    for (const tx of transactions) await ctx.db.delete(tx._id);
    await ctx.db.delete(args.holdingId);
  },
});

// Dashboard Stats
export const getDashboardStats = query({
  args: {},
  handler: async (ctx) => {
    const session = await getSession(ctx);
    if (!session) throw new Error("Unauthorized");
    
    const portfolios = await ctx.db
      .query("portfolios")
      .filter((q) => q.eq(q.field("userId"), session.userId))
      .collect();
    
    let holdings: any[] = [];
    for (const portfolio of portfolios) {
      const ph = await ctx.db
        .query("holdings")
        .filter((q) => q.eq(q.field("portfolioId"), portfolio._id))
        .collect();
      holdings.push(...ph);
    }

    const totalValue = holdings.reduce((sum, h) => sum + h.quantity * h.currentPrice, 0);
    const totalCost = holdings.reduce((sum, h) => sum + h.quantity * h.avgBuyPrice, 0);
    const totalPnl = totalValue - totalCost;

    return {
      totalValue,
      totalCost,
      totalPnl,
      holdingsCount: holdings.length,
      topGainers: holdings.filter((h) => h.change24h > 0).sort((a, b) => b.change24h - a.change24h).slice(0, 5),
      topLosers: holdings.filter((h) => h.change24h < 0).sort((a, b) => a.change24h - b.change24h).slice(0, 5),
    };
  },
});

// Seed Database
export const seedDatabase = mutation({
  args: {},
  handler: async (ctx) => {
    const session = await getSession(ctx);
    if (!session) throw new Error("Unauthorized");
    
    const userId = session.userId;
    
    const existingPortfolios = await ctx.db
      .query("portfolios")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();

    if (existingPortfolios.length > 0) {
      return { message: "Portfolio already exists", portfolioId: existingPortfolios[0]._id };
    }

    const portfolioId = await ctx.db.insert("portfolios", {
      userId,
      name: "Default Portfolio",
      createdAt: Date.now(),
    });

    const sampleHoldings = [
      { symbol: "AAPL", name: "Apple Inc.", type: "stock", quantity: 50, avgBuyPrice: 175.5, currentPrice: 178.25, change24h: 1.25 },
      { symbol: "GOOGL", name: "Alphabet Inc.", type: "stock", quantity: 20, avgBuyPrice: 140.0, currentPrice: 142.8, change24h: 2.0 },
      { symbol: "MSFT", name: "Microsoft Corp.", type: "stock", quantity: 35, avgBuyPrice: 375.0, currentPrice: 378.5, change24h: 0.93 },
      { symbol: "BTC", name: "Bitcoin", type: "crypto", quantity: 0.5, avgBuyPrice: 45000, currentPrice: 48250, change24h: 3.2 },
      { symbol: "ETH", name: "Ethereum", type: "crypto", quantity: 3, avgBuyPrice: 2200, currentPrice: 2350, change24h: 2.8 },
    ];

    for (const holding of sampleHoldings) {
      await ctx.db.insert("holdings", {
        portfolioId,
        ...holding,
        createdAt: Date.now(),
      });
    }

    return { message: "Database seeded successfully", portfolioId };
  },
});
