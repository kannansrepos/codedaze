import {
  CreatePost,
  GetPostIndexByPage,
  GetTopPostIndexes,
} from '../db/service';

const CreatePostIndex = async (postId: string) => {
  try {
    const response = await CreatePost({
      postId,
    });
    if (!response) {
      throw new Error('Failed to create post index');
    }
  } catch (error) {
    console.error('Error pushing to database:', error);
    throw new Error('Failed to push data to database');
  }
};

const GetTopThreePostIndexes = (recordCount: number) =>
  GetTopPostIndexes(recordCount);
const GetAllPostIndex = (pageSize: number = 9, pageToken: number = 1) =>
  GetPostIndexByPage(pageSize, pageToken);
export { CreatePostIndex as PushToDatabase, GetTopThreePostIndexes, GetAllPostIndex };
