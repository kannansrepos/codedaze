import {
  CreatePost,
  GetPostIndexByPage,
  GetTopPostIndexes,
} from '../db/service';

const PushToDatabase = async (fileName: string) => {
  try {
    const response = await CreatePost({
      postId: fileName,
    });
    console.log('Post index created:', response);
    if (!response) {
      throw new Error('Failed to create post index');
    }
  } catch (error) {
    console.error('Error pushing to database:', error);
    throw new Error('Failed to push data to database');
  }
};

const GetTopThreePostIndexes = () => GetTopPostIndexes();
const GetAllPostIndex = (pageSize: number = 9, pageToken: string = '1') =>
  GetPostIndexByPage(pageSize, pageToken);
export { PushToDatabase, GetTopThreePostIndexes, GetAllPostIndex };
