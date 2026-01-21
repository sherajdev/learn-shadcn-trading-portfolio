// Convex functions
// Run `npx convex dev` to generate proper types and enable these functions

/*
import { query, mutation } from "convex/server";
import { v } from "convex/values";

export const getAllHoldings = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("holdings").collect();
  },
});

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
*/

// Placeholder - Convex types will be generated when you run `npx convex dev`
export const placeholder = true;
