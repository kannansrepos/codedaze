import { eq, desc } from 'drizzle-orm';
import { db } from '@/db';
import { PostIndex } from '@/types/BlogPost';
import { postIndexTable } from './schema';

const CreatePostIndex = async (data: PostIndex) => {
  const queryBuilder = db;
  const result = await queryBuilder
    .select()
    .from(postIndexTable)
    .where(eq(postIndexTable.postId, data.postId))
    .then((result) => result[0]);
  if (!result) {
    return await _createPostIndex(data);
  }
  return result.id;
};

const GetAllPostIndex = async (pageSize: number = 3, pageToken: number = 1) => {
  const queryBuilder = db;
  const result = await queryBuilder
    .select()
    .from(postIndexTable)
    .orderBy(desc(postIndexTable.createdAt))
    .limit(pageSize)
    .offset(pageSize * (pageToken - 1));
  return {
    data: result,
    nextPageToken:
      result.length < pageSize * pageToken
        ? undefined
        : (pageToken + 1).toString(),
  };
};

const GetTopPostIndex = async (limit: number = 3) => {
  const queryBuilder = db;
  const result = await queryBuilder
    .select()
    .from(postIndexTable)
    .orderBy(desc(postIndexTable.createdAt))
    .limit(limit);
  return result;
};

const _createPostIndex = async (data: PostIndex) => {
  const queryBuilder = db;
  const result = await queryBuilder
    .insert(postIndexTable)
    .values(data)
    .returning({ id: postIndexTable.id });
  return result[0].id;
};

export { CreatePostIndex, GetAllPostIndex, GetTopPostIndex };
