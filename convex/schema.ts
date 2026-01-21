import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  portfolios: defineTable({
    userId: v.string(),
    name: v.string(),
    createdAt: v.number(),
  }),
  holdings: defineTable({
    portfolioId: v.id("portfolios"),
    symbol: v.string(),
    name: v.string(),
    type: v.string(),
    quantity: v.number(),
    avgBuyPrice: v.number(),
    currentPrice: v.number(),
    change24h: v.number(),
    createdAt: v.number(),
  }),
  transactions: defineTable({
    holdingId: v.id("holdings"),
    type: v.string(),
    quantity: v.number(),
    price: v.number(),
    date: v.number(),
  }),
});
