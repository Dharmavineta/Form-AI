import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const forms = pgTable("forms", {
  id: uuid("id").defaultRandom().primaryKey(),
  jsonForm: text("jsonForm").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});
