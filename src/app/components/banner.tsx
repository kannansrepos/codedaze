import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MailIcon } from 'lucide-react';
const Banner = () => {
  return (
    <div className="h-96 w-full bg-center border-none bg-no-repeat flex items-center justify-center ">
      <div className="flex flex-col gap-3 w-full max-w-[50%] items-center space-x-2">
        <h1 className="font-bold text-5xl text-center text-white flex">
          Power Up Your{' '}
          <p className="text-6xl bg-gradient-to-r from-[#2A42BA] via-[#8142EF] to-[#C521EF] inline-block text-transparent bg-clip-text">
            .NET – Fresh Tip
          </p>
        </h1>
        <div className="font-bold text-5xl text-center text-white">
          Every Friday
        </div>
        <Input
          type="email"
          placeholder="Your Email Address"
          className="text-primary-foreground placeholder:text-primary-foreground max-w-96"
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
