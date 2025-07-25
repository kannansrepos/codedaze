import { Button } from '../ui/button';
import { Input } from '../ui/input';

const NewsLetter = () => {
  return (
    <div className="flex item-center justify-center">
      <div className="w-full px-4 md:px-0 lg:w-3/4 xl:w-2/4 bg-[#111827] text-white shadow-lg py-12 my-4 rounded-2xl flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl md:text-4xl">
          🚀 Power Up Your .NET{' '}
          <span className="hidden  md:inline-block">Engineering</span>
        </h1>
        <p>Join with me and improve your .NET Fullstack Skill.</p>
        <Input
          type="email"
          placeholder="Enter your email"
          className="w-full md:w-2/4 bg-white text-black rounded-2xl"
        />
        <Button className="rounded-2xl text-white w-60"> Join Now</Button>
      </div>
    </div>
  );
};

export default NewsLetter;
