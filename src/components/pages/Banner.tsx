import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MailIcon } from 'lucide-react';
const Banner = () => {
  return (
    <div className="h-full xl:h-[720px] w-full bg-center border-none bg-no-repeat flex items-center justify-center ">
      <div className="flex flex-col gap-3 w-full md:max-w-[50%] items-center space-x-2">
        <h1 className="font-bold text-5xl text-center text-white flex">
          <p className="hidden xl:inline">Power Up Your</p>
          <p className="text-4xl lg:text-6xl bg-gradient-to-r from-[#2A42BA] via-[#8142EF] to-[#C521EF] inline-block text-transparent bg-clip-text">
            .NET – Fresh Tip
          </p>
        </h1>
        <div className="text-2xl lg:text-5xl font-bold  text-center text-white">
          Every Saturday & Monday
        </div>
        <div className="max-w-96 w-full px-5">
          <Input
            type="email"
            placeholder="Your Email Address"
            className="text-primary-foreground placeholder:text-primary-foreground w-full "
          />
        </div>
        <Button type="submit" variant={'default'}>
          <MailIcon />
          Join with Us
        </Button>
        <div className="text-center text-white flex gap-4 flex-col px-5">
          <ul className="flex flex-col gap-2 md:gap-4 text-left px-5">
            <li
              className="flex flex-col md:gap-2
            "
            >
              <div className="text-sm xl:text-xl md:font-bold">
                📚 Learn from Real-World Examples
              </div>
              <div className="text-sm text-gray-600 hidden xl:block">
                Practical .NET content such as Model Context Protocols (MCP) in
                .NET from Scratch” and “Building High‑Performance Import
                Features”
              </div>
            </li>
            <li className="flex flex-col gap-2">
              <div className="text-sm xl:text-xl md:font-bold">
                ☕ Start Your Week Strong
              </div>
              <div className="text-sm text-gray-600 hidden xl:block">
                Monday mornings bring a fresh, actionable .NET tip to fuel
                productivity
              </div>
            </li>
            <li className="flex flex-col gap-2">
              <div className="text-sm xl:text-xl md:font-bold">
                🧠 Deep Dives & Architecture Talks
              </div>
              <div className="text-sm text-gray-600 hidden xl:block">
                Complex topics made accessible with clear guidance and code
                samples
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Banner;
