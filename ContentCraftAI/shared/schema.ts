import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Video uploads schema
export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  fileName: text("file_name").notNull(),
  fileSize: integer("file_size").notNull(),
  duration: integer("duration"),
  transcript: text("transcript"),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at").notNull(),
});

// Generated content schema
export const generatedContents = pgTable("generated_contents", {
  id: serial("id").primaryKey(),
  videoId: integer("video_id").references(() => videos.id),
  platform: text("platform").notNull(),
  title: text("title").notNull(),
  script: text("script").notNull(),
  captions: text("captions").notNull(),
  createdAt: text("created_at").notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertVideoSchema = createInsertSchema(videos).omit({
  id: true,
  status: true,
  createdAt: true,
});

export const insertGeneratedContentSchema = createInsertSchema(generatedContents).omit({
  id: true,
  createdAt: true,
});

// Repurpose content request schema
export const repurposeContentSchema = z.object({
  transcript: z.string(),
  videoId: z.number().optional(),
});

// Platform output schema for content repurposing
export const platformOutputSchema = z.object({
  platform: z.string(),
  title: z.string(),
  script: z.string(),
  captions: z.string(),
});

export const repurposeContentResponseSchema = z.object({
  contents: z.array(platformOutputSchema)
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type Video = typeof videos.$inferSelect;

export type InsertGeneratedContent = z.infer<typeof insertGeneratedContentSchema>;
export type GeneratedContent = typeof generatedContents.$inferSelect;

export type RepurposeContentRequest = z.infer<typeof repurposeContentSchema>;
export type RepurposeContentResponse = z.infer<typeof repurposeContentResponseSchema>;
export type PlatformOutput = z.infer<typeof platformOutputSchema>;
