import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Games table - Stores information about monitored games
 */
export const games = mysqlTable("games", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  provider: varchar("provider", { length: 255 }).notNull(),
  currentRtp: int("currentRtp").notNull().default(0), // Stored as basis points (e.g., 9650 = 96.50%)
  volatility: varchar("volatility", { length: 50 }).default("medium"), // low, medium, high
  status: varchar("status", { length: 50 }).default("active"), // active, inactive
  lastUpdated: timestamp("lastUpdated").defaultNow().onUpdateNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Game = typeof games.$inferSelect;
export type InsertGame = typeof games.$inferInsert;

/**
 * RTP History table - Tracks RTP changes over time
 */
export const rtpHistory = mysqlTable("rtpHistory", {
  id: int("id").autoincrement().primaryKey(),
  gameId: int("gameId").notNull().references(() => games.id),
  rtp: int("rtp").notNull(), // Stored as basis points
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export type RtpHistory = typeof rtpHistory.$inferSelect;
export type InsertRtpHistory = typeof rtpHistory.$inferInsert;

/**
 * Alerts table - User alerts for RTP changes and volatility
 */
export const alerts = mysqlTable("alerts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  gameId: int("gameId").notNull().references(() => games.id),
  alertType: varchar("alertType", { length: 50 }).notNull(), // rtp_change, volatility_spike, price_drop
  threshold: int("threshold").notNull(), // Threshold value in basis points
  isActive: int("isActive").default(1).notNull(), // 0 = false, 1 = true
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  triggeredAt: timestamp("triggeredAt"),
});

export type Alert = typeof alerts.$inferSelect;
export type InsertAlert = typeof alerts.$inferInsert;

/**
 * User Preferences table - Store user settings
 */
export const userPreferences = mysqlTable("userPreferences", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique().references(() => users.id),
  theme: varchar("theme", { length: 50 }).default("dark"),
  emailNotifications: int("emailNotifications").default(1),
  pushNotifications: int("pushNotifications").default(1),
  updateFrequency: varchar("updateFrequency", { length: 50 }).default("realtime"), // realtime, hourly, daily
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserPreferences = typeof userPreferences.$inferSelect;
export type InsertUserPreferences = typeof userPreferences.$inferInsert;