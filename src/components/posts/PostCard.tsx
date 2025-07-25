import { Link2Icon } from 'lucide-react';
import ImageWithFallback from '@/components/ImageWithFallback';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Slag } from '@/types/BlogPost';

type Props = {
  post: Slag;
  postId: string;
  showDescription?: boolean;
  ViewPost: (postId: string) => void;
};
const PostCard = ({ post, showDescription, ViewPost, postId }: Props) => {
  return (
    <div key={post.title}>
      <Card className="">
        <CardTitle className="p-8">
          <div className={cn('relative')}>
            <ImageWithFallback
              src={`/banner/${post.language}.png`}
              alt={post.language}
              width={1200}
              height={1200}
              fallbackSrc="/banner/codedaze.png"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full text-center flex justify-center items-center text-xl font-bold text-primary dark:text-primary-foreground ">
              <h1 className="bg-gradient-to-r from-[#2A42BA] via-[#8142EF] to-[#C521EF] inline-block text-transparent bg-clip-text">
                {post.title.length > 15
                  ? post.title.substring(0, 15).toUpperCase() + '...'
                  : post.title.toUpperCase()}
              </h1>
            </div>
          </div>
        </CardTitle>
        <CardHeader className="text-lg font-bold text-primary dark:text-primary-foreground">
          {post.title}
        </CardHeader>
        {showDescription && (
          <CardContent className="text-justify">{post.subtitle}</CardContent>
        )}

        <CardFooter className="flex items-end justify-end">
          <Button
            className="hover:border-primary border-2 hover:text-primary dark:hover:bg-primary-foreground dark:hover:text-primary"
            onClick={() => ViewPost(postId)}
          >
            <Link2Icon className="mr-2 h-4 w-4" />
            Read More...
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostCard;
