import { Button } from '@/components/ui/button';
import { Menu, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {};

const LandingPageNavBar = (props: Props) => {
  return (
    <div className="flex w-full justify-between items-center py-4 px-6">
      {/* Logo Section */}
      <div className="text-3xl font-semibold flex items-center gap-x-3">
        <Menu className="w-8 h-8" aria-label="Menu Icon" />
        <Image
          src="/frameflow.png"
          alt="FrameFlow logo - rounded icon"
          width={50}
          height={50}
          className="rounded-full"
        />
        frameflow
      </div>

      {/* Navigation Links */}
      <div className="hidden gap-x-10 items-center lg:flex">
        <Link href="/" className="bg-[#ad67c9] py-2 px-5 font-semibold text-lg rounded-full">
          Home
        </Link>
        <Link href="/">Pricing</Link>
        <Link href="/">Contact</Link>
        <Link href="/auth/sign-in">
          <Button className="text-base flex gap-x-2">
            <User fill="#000" />
            Login
          </Button>
        </Link>
      </div>

      {/* Mobile Menu Icon */}
      <div className="flex lg:hidden">
        <Menu className="w-8 h-8" aria-label="Open Menu" />
      </div>
    </div>
  );
};

export default LandingPageNavBar;
