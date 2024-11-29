import { Card, CardHeader, CardContent } from '@/components/ui/card';
import BlogEditor from '../_components/BlogEditor';

const AddNewPost = () => {
  return (
    <div className="h-screen w-screen flex items-start justify-start p-4 container mx-auto">
      <Card className="w-full">
        <CardHeader>Write a blog with all details</CardHeader>
        <CardContent>
          <BlogEditor />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddNewPost;
