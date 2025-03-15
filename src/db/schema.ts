import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { authUsers } from 'drizzle-orm/supabase';

const postsTable = pgTable('posts_table', {
  id: serial('id').primaryKey(),
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
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  language: text('content'),
  shortTitle: text('code'),
  description: text('image'),
  category: text('imageAlt'),
  videoUrl: text('video_url'),
  videoTitle: text('video_title'),
  postId: uuid().references(() => postsTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});
// Helper function to create insert and select types
type TableTypes<T extends { $inferInsert: any; $inferSelect: any }> = {
  Insert: T['$inferInsert'];
  Select: T['$inferSelect'];
};

// Generate types for all tables
// type Users = TableTypes<typeof usersTable>;
type Posts = TableTypes<typeof postsTable>;
type PostSections = TableTypes<typeof postSectionsTable>;

// Export table types
export type { Posts, PostSections };

export type InsertPost = Posts['Insert'];
export type SelectPost = Posts['Select'];

export type InsertSection = PostSections['Insert'];
export type Selectections = PostSections['Select'];

// Export tables
export { postsTable, postSectionsTable };
