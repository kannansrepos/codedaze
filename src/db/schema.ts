import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { authUsers } from 'drizzle-orm/supabase';

const postIndexTable = pgTable('postIndex_table', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  postId: text('url').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

const postsTable = pgTable('posts_table', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  url: text('url').notNull(),
  metadata: text('metadata'),
  language: text('language').notNull(),
  shortTitle: text('shortTitle').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  category: text('category'),
  readMin: integer('readMin'),
  userId: uuid().references(() => authUsers.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

const postSectionsTable = pgTable('postSections_table', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  title: text('title').notNull(),
  content: text('content'),
  code: text('code'),
  image: text('image'),
  imageAlt: text('imageAlt'),
  videoUrl: text('video_url'),
  videoTitle: text('video_title'),
  postId: uuid().references(() => postsTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});
// Helper function to create insert and select types
type TableTypes<T extends { $inferInsert: unknown; $inferSelect: unknown }> = {
  Insert: T['$inferInsert'];
  Select: T['$inferSelect'];
};

// Generate types for all tables
// type Users = TableTypes<typeof usersTable>;
type PostIndex = TableTypes<typeof postIndexTable>;

type Posts = TableTypes<typeof postsTable>;
type PostSections = TableTypes<typeof postSectionsTable>;

// Export table types
export type { Posts, PostSections, PostIndex };

export type InsertPost = Posts['Insert'];
export type SelectPost = Posts['Select'];

export type InsertSection = PostSections['Insert'];
export type Selectections = PostSections['Select'];

export type InsertPostIndex = PostIndex['Insert'];
export type SelectPostIndex = PostIndex['Select'];
// Export tables
export { postsTable, postSectionsTable, postIndexTable };
