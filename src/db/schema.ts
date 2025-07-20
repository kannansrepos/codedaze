import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { authUsers } from 'drizzle-orm/supabase';

const postIndexTable = pgTable('postIndex_table', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  postId: text('url').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  userId: uuid().references(() => authUsers.id, { onDelete: 'cascade' }),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

// Helper function to create insert and select types
type TableTypes<T extends { $inferInsert: unknown; $inferSelect: unknown }> = {
  Insert: T['$inferInsert'];
  Select: T['$inferSelect'];
};

type PostIndex = TableTypes<typeof postIndexTable>;

export type { PostIndex };

export type InsertPostIndex = PostIndex['Insert'];
export type SelectPostIndex = PostIndex['Select'];

export { postIndexTable };
