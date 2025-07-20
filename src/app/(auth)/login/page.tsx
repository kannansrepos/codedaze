/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SupabaseAuthenticationAsync } from '@/utils/supabaseActions';

const LoginPage = () => {
  const router = useRouter();
  const logos = {
    google: '/images/logos/google.svg',
    github: '/images/logos/github.svg',
    bg: '/s.svg',
  };
  const signIn = async (authProvider: 'google' | 'github' | 'email') => {
    const { error, data } = await SupabaseAuthenticationAsync(authProvider);
    if (error) {
      console.error('Error during sign-in', error);
      toast.error('Error during sign-in');
      return;
    }
    if ('url' in data && typeof data.url === 'string') {
      router.push(data.url);
    } else {
      router.push('/');
    }
  };
  return (
    <>
      <div className="bg-[#2A42BA] absolute top-0 left-0 bg-gradient-to-b from-[#8142EF] via-[#2A42BA] to-[#C521EF] bottom-0 leading-5 h-full w-full overflow-hidden "></div>
      <div className="relative   min-h-screen  sm:flex sm:flex-row  justify-center bg-transparent rounded-3xl shadow-xl">
        <div className="flex justify-center self-center  z-10">
          <div className="p-12 bg-white mx-auto rounded-3xl w-96 ">
            <div className="mb-7">
              <h3 className="font-semibold text-2xl text-gray-800">Sign In </h3>
            </div>
            <div className="space-y-6">
              <div className="">
                <Input
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                  type=""
                  placeholder="Email"
                />
              </div>
              <div className="relative" x-data="{ show: true }">
                <input
                  placeholder="Password"
                  className="text-sm text-gray-200 px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-purple-400"
                />
                <div className="flex items-center absolute inset-y-0 right-0 mr-3  text-sm leading-5"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm ml-auto">
                  <a href="#" className="text-purple-700 hover:text-purple-600">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <Button
                  className="w-full flex justify-center text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
                  onClick={() => signIn('email')}
                >
                  Sign In
                </Button>
              </div>
              <div className="flex items-center justify-center space-x-2 my-5">
                <span className="h-px w-16 bg-gray-100"></span>
                <span className="text-gray-300 font-normal">or</span>
                <span className="h-px w-16 bg-gray-100"></span>
              </div>
              <div className="flex justify-center gap-5 w-full ">
                <button
                  className="w-full flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:border-gray-900 hover:bg-gray-900 text-sm text-gray-500 p-3  rounded-lg tracking-wide font-medium  cursor-pointer transition ease-in duration-500"
                  onClick={() => signIn('google')}
                >
                  <Image
                    src={logos.google}
                    alt="Google Login"
                    width={'100'}
                    height={100}
                    className="w-5 h-5 mr-2"
                  />
                  <span>Google</span>
                </button>

                <button
                  className="w-full flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:border-gray-900 hover:bg-gray-900 text-sm text-gray-500 p-3  rounded-lg tracking-wide font-medium  cursor-pointer transition ease-in duration-500 px-4"
                  onClick={() => signIn('github')}
                >
                  <Image
                    src={logos.github}
                    alt="github Login"
                    width={'100'}
                    height={100}
                    className="w-5 h-5 mr-2"
                  />
                  <span>Github</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image
        src={logos.bg}
        alt="Bg Image"
        width={'100'}
        height={100}
        className="absolute bottom-0 left-0 w-full object-cover"
      />
    </>
  );
};

export default LoginPage;
