import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";

export const budgets = pgTable("budgets", {
    id:serial("id").primaryKey(),
    name:varchar("name").notNull(),
    amount:varchar("amount").notNull().default(0),
    icon:varchar("icon"),
    createdBy:varchar("createdBy").notNull()
});

export const expenses = pgTable("expenses", {
    id:serial("id").primaryKey(),
    name:varchar("name").notNull(),
    amount:varchar("amount").notNull(),
    budgetId:integer("budgetId").references(() => budgets.id).notNull(),
    createdAt:varchar("createdAt").notNull()
})  