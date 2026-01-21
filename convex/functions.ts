import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Portfolio Queries
export const getPortfolios = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("portfolios")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();
  },
});

export const getPortfolioById = query({
  args: { portfolioId: v.id("portfolios") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.portfolioId);
  },
});

// Portfolio Mutations
export const createPortfolio = mutation({
  args: { userId: v.string(), name: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("portfolios", {
      userId: args.userId,
      name: args.name,
      createdAt: Date.now(),
    });
  },
});

export const updatePortfolio = mutation({
  args: { portfolioId: v.id("portfolios"), name: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.portfolioId, { name: args.name });
  },
});

export const deletePortfolio = mutation({
  args: { portfolioId: v.id("portfolios") },
  handler: async (ctx, args) => {
    const holdings = await ctx.db
      .query("holdings")
      .filter((q) => q.eq(q.field("portfolioId"), args.portfolioId))
      .collect();
    for (const holding of holdings) {
      const transactions = await ctx.db
        .query("transactions")
        .filter((q) => q.eq(q.field("holdingId"), holding._id))
        .collect();
      for (const tx of transactions) {
        await ctx.db.delete(tx._id);
      }
      await ctx.db.delete(holding._id);
    }
    await ctx.db.delete(args.portfolioId);
  },
});

// Holdings Queries
export const getHoldings = query({
  args: { portfolioId: v.id("portfolios") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("holdings")
      .filter((q) => q.eq(q.field("portfolioId"), args.portfolioId))
      .collect();
  },
});

export const getAllHoldings = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("holdings").collect();
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
    const updates: Record<string, unknown> = {};
    if (args.currentPrice !== undefined) updates.currentPrice = args.currentPrice;
    if (args.change24h !== undefined) updates.change24h = args.change24h;
    await ctx.db.patch(args.holdingId, updates);
  },
});

export const deleteHolding = mutation({
  args: { holdingId: v.id("holdings") },
  handler: async (ctx, args) => {
    const transactions = await ctx.db
      .query("transactions")
      .filter((q) => q.eq(q.field("holdingId"), args.holdingId))
      .collect();
    for (const tx of transactions) {
      await ctx.db.delete(tx._id);
    }
    await ctx.db.delete(args.holdingId);
  },
});

// Transactions
export const getTransactions = query({
  args: { holdingId: v.id("holdings") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("transactions")
      .filter((q) => q.eq(q.field("holdingId"), args.holdingId))
      .collect();
  },
});

export const createTransaction = mutation({
  args: {
    holdingId: v.id("holdings"),
    type: v.string(),
    quantity: v.number(),
    price: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("transactions", {
      holdingId: args.holdingId,
      type: args.type,
      quantity: args.quantity,
      price: args.price,
      date: Date.now(),
    });
  },
});

// Dashboard Stats
export const getDashboardStats = query({
  args: { portfolioId: v.id("portfolios") },
  handler: async (ctx, args) => {
    const holdings = await ctx.db
      .query("holdings")
      .filter((q) => q.eq(q.field("portfolioId"), args.portfolioId))
      .collect();

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
  args: { userId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const userId = args.userId || "default-user";
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
