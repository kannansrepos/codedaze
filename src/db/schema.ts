import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const postIndexTable = pgTable('postIndex_table', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  postId: text('url').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  userId: text('user_id'), // Can store email or ID
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export const autoPostsTable = pgTable('auto_posts', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  topic: text('topic').notNull(),
  content: text('content').notNull(),
  status: text('status').notNull().default('PENDING'), // PENDING, APPROVED, REJECTED
  language: text('language').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Helper function to create insert and select types
type TableTypes<T extends { $inferInsert: unknown; $inferSelect: unknown }> = {
  Insert: T['$inferInsert'];
  Select: T['$inferSelect'];
};

type User = TableTypes<typeof usersTable>;
type PostIndex = TableTypes<typeof postIndexTable>;
type AutoPost = TableTypes<typeof autoPostsTable>;

export type { User, PostIndex, AutoPost };

export type InsertUser = User['Insert'];
export type SelectUser = User['Select'];
export type InsertPostIndex = PostIndex['Insert'];
export type SelectPostIndex = PostIndex['Select'];
export type InsertAutoPost = AutoPost['Insert'];
export type SelectAutoPost = AutoPost['Select'];
