import { eq, desc } from 'drizzle-orm';
import { db } from '../db';
import {
  InsertPost,
  SelectPost,
  postsTable,
  postSectionsTable,
  InsertSection,
  postIndexTable,
} from '../db/schema';
import { BlogPost, PostIndex } from '../types/BlogPost';

const createPostIndex = async (data: PostIndex) => {
  const queryBuilder = db;
  const result = await queryBuilder
    .insert(postIndexTable)
    .values(data)
    .returning({ id: postIndexTable.id });
  return result[0].id;
};

const createPostIndexIfNotExists = async (data: PostIndex) => {
  const queryBuilder = db;
  const result = await queryBuilder
    .select()
    .from(postIndexTable)
    .where(eq(postIndexTable.postId, data.postId))
    .then((result) => result[0]);
  if (!result) {
    return await createPostIndex(data);
  }
  return result.id;
};

// This function retrieves the top postsindex based on the createdAt timestamp with pagination support.
export const getPostIndexByPage = async (
  pageSize: number = 9,
  pageToken: number = 1
) => {
  const queryBuilder = db;
  const result = await queryBuilder
    .select()
    .from(postIndexTable)
    .orderBy(desc(postIndexTable.createdAt))
    .limit(pageSize)
    .offset(pageSize * (pageToken - 1));
  // const totalCount = await queryBuilder
  //   .select({ count: postIndexTable.id.count() })
  //   .from(postIndexTable)
  //   .then((res) => res[0].count);
  return {
    data: result,
    nextPageToken:
      result.length < pageSize * pageToken
        ? undefined
        : (pageToken + 1).toString(),
  };
};

const getTopPostIndexes = async (limit: number = 3) => {
  const queryBuilder = db;
  const result = await queryBuilder
    .select()
    .from(postIndexTable)
    .orderBy(desc(postIndexTable.createdAt))
    .limit(limit);
  return result;
};

const createNewPost = async (data: BlogPost) => {
  // Start a transaction
  return await db.transaction(async () => {
    // Create the post and get the ID
    const postId = await createPost({
      url: data.url,
      metadata: data.metadata,
      language: data.language,
      shortTitle: data.shortTitle,
      title: data.title,
      description: data.description,
      category: data.category,
      readMin: data.readMin,
    });
    // Use Promise.all to handle all section creations in parallel
    await Promise.all(
      data.section.map((section) =>
        createSection({
          ...section,
          postId,
        })
      )
    );

    return postId;
  });
};

export async function createPost(data: InsertPost) {
  const queryBuilder = db;
  const result = await queryBuilder
    .insert(postsTable)
    .values(data)
    .returning({ id: postsTable.id });

  return result[0].id;
}
export async function updatePost(
  id: SelectPost['id'],
  data: Partial<Omit<SelectPost, 'id'>>
) {
  await db.update(postsTable).set(data).where(eq(postsTable.id, id));
}
export async function deletePost(id: SelectPost['id']) {
  await db.delete(postsTable).where(eq(postsTable.id, id));
}
export async function getPosts(
  pageSize: number,
  pageToken: string
): Promise<{ data: BlogPost[]; nextPageToken: string }> {
  // First, fetch all posts
  const posts = await db
    .select({
      id: postsTable.id,
      url: postsTable.url,
      metadata: postsTable.metadata,
      language: postsTable.language,
      shortTitle: postsTable.shortTitle,
      title: postsTable.title,
      description: postsTable.description,
      category: postsTable.category,
      readMin: postsTable.readMin,
      userId: postsTable.userId,
      createdAt: postsTable.createdAt,
      updatedAt: postsTable.updatedAt,
    })
    .from(postsTable)
    .orderBy(postsTable.createdAt)
    .limit(pageSize);

  // Apply pagination if needed
  let paginatedPosts = posts;
  if (pageToken) {
    const startIndex = pageSize * parseInt(pageToken);
    paginatedPosts = posts.slice(startIndex, startIndex + pageSize);
  }
  // For each post, fetch its sections
  const postsWithSections = await Promise.all(
    paginatedPosts.map(async (post) => {
      const sections = await db
        .select()
        .from(postSectionsTable)
        .where(eq(postSectionsTable.postId, post.id));

      return {
        ...post,
        id: post.id.toString(),
        section: sections.map((section) => ({
          ...section,
        })),
      } as BlogPost;
    })
  );
  return {
    data: postsWithSections,
    nextPageToken:
      posts.length > pageSize * (parseInt(pageToken || '0') + 1)
        ? (parseInt(pageToken || '0') + 1).toString()
        : '',
  };
}

export async function getPost(id: SelectPost['id']) {
  const post = await db
    .select({
      id: postsTable.id,
      language: postsTable.language,
      shortTitle: postsTable.shortTitle,
      title: postsTable.title,
      description: postsTable.description,
      category: postsTable.category,
      readMin: postsTable.readMin,
      userId: postsTable.userId,
      createdAt: postsTable.createdAt,
      updatedAt: postsTable.updatedAt,
      section: postSectionsTable,
    })
    .from(postsTable)
    .leftJoin(postSectionsTable, eq(postsTable.id, postSectionsTable.postId))
    .where(eq(postsTable.id, id))
    .then((result) => result[0]);
  return {
    ...post,
    id: post.id.toString(),
    section: post.section ? [{ ...post.section }] : [],
  } as unknown as BlogPost;
}
export async function createSection(data: InsertSection, tx?: typeof db) {
  const queryBuilder = tx || db;
  return await queryBuilder
    .insert(postSectionsTable)
    .values(data)
    .returning({ id: postSectionsTable.id });
}
export default createNewPost;
export {
  createPostIndexIfNotExists as CreatePost,
  getTopPostIndexes as GetTopPostIndexes,
  getPostIndexByPage as GetPostIndexByPage,
};
