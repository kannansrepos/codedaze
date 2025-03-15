import { eq } from 'drizzle-orm';
import { db } from '../db';
import {
  InsertPost,
  SelectPost,
  postsTable,
  postSectionsTable,
  InsertSection,
} from '../db/schema';
import { BlogPost } from '../types/BlogPost';

const createNewPost = async (data: BlogPost) => {
  // Start a transaction
  return await db.transaction(async (tx) => {
    // Create the post and get the ID
    const postId = await createPost(
      {
        language: data.language,
        shortTitle: data.shortTitle,
        title: data.title,
        description: data.description,
        category: data.category,
        readMin: data.readMin,
      },
      tx
    );
    // Use Promise.all to handle all section creations in parallel
    await Promise.all(
      data.section.map((section) =>
        createSection(
          {
            ...section,
            postId,
          },
          tx
        )
      )
    );

    return postId;
  });
};

export async function createPost(data: InsertPost, tx?: any) {
  const queryBuilder = tx || db;
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
  const posts = await db
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
    .orderBy(postsTable.createdAt)
    .limit(pageSize);
  if (pageToken) {
    const startIndex = pageSize * parseInt(pageToken);
    posts.slice(startIndex, startIndex + pageSize);
  }
  return {
    data: posts.map((post) => ({
      ...post,
      id: post.id.toString(),
      section: post.section
        ? [
            {
              id: post.section.id,
              title: post.section.title,
              language: post.section.language,
              shortTitle: post.section.shortTitle,
              description: post.section.description,
              category: post.section.category,
              videoUrl: post.section.videoUrl,
              videoTitle: post.section.videoTitle,
              postId: post.section.postId,
              createdAt: post.section.createdAt,
              updatedAt: post.section.updatedAt,
              content: '',
            },
          ]
        : [],
    })) as BlogPost[],
    nextPageToken: '',
  };
}

export async function createSection(data: InsertSection, tx?: any) {
  const queryBuilder = tx || db;
  return await queryBuilder
    .insert(postSectionsTable)
    .values(data)
    .returning({ id: postSectionsTable.id });
}

export default createNewPost;
