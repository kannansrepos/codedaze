import { Card, CardContent } from '@/components/ui/card';
import TextEditor from './_components/TextEditor';

const AddNewPost = () => {
  return (
    <div className="h-screen w-screen flex items-start justify-start p-4 container mx-auto">
      <Card className="w-full">
        <CardContent className="p-6">
          <TextEditor />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddNewPost;
