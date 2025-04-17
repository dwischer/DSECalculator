import { pgTable, text, serial, integer, boolean, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema (keeping the original user schema)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Calculator Input schema
export const calculatorInputs = pgTable("calculator_inputs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  
  // Personal Info
  baseSalary: numeric("base_salary").notNull(),
  annualBonus: numeric("annual_bonus").notNull(),
  annualRaise: numeric("annual_raise").notNull(),
  
  // Ownership Info
  ownershipStake: numeric("ownership_stake").notNull(),
  companyValuation: numeric("company_valuation").notNull(),
  valuationGrowthRate: numeric("valuation_growth_rate").notNull(),
  dilutionRate: numeric("dilution_rate").notNull(),
  
  // Financing Info
  esopCount: integer("esop_count").notNull(),
  strikePrice: numeric("strike_price").notNull(),
  seedfundingAmount: numeric("seedfunding_amount").notNull(),
  seedfundingEquity: numeric("seedfunding_equity").notNull(),
  vcAmount: numeric("vc_amount").notNull(),
  vcEquity: numeric("vc_equity").notNull(),
  vdlAmount: numeric("vdl_amount").notNull(),
  interestRate: numeric("interest_rate").notNull(),
  repaymentPeriod: integer("repayment_period").notNull(),
  
  // Metadata
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const insertCalculatorInputSchema = createInsertSchema(calculatorInputs).omit({
  id: true,
  createdAt: true
});

export type InsertCalculatorInput = z.infer<typeof insertCalculatorInputSchema>;
export type CalculatorInput = typeof calculatorInputs.$inferSelect;
