import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MailIcon } from 'lucide-react';
const Banner = () => {
  return (
    <div className="h-80 w-full bg-[url('/bg_search.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="email"
          placeholder="Your Email Address"
          className="text-primary-foreground placeholder:text-primary-foreground"
        />
        <Button type="submit" variant={'default'}>
          <MailIcon />
          Join with Us
        </Button>
      </div>
    </div>
  );
};

export default Banner;
