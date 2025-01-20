import { Button } from '@/src/components/ui/button';
import { Menu,User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


type Props = {};

const LandingPageNavBar = (props: Props) => {
  return (
    <div className='flex w-full justify-between items-center'>
      <div className='text-3xl font-semibold flex items-center gap-x-3'>
        <Menu className='w-8 h-8' />
        <Image 
          src='/frameflow.png' 
          alt='FrameFlow Logo' 
          width={50} 
          height={50}
          className='rounded-full'
        />
        frameflow
      </div>
      <div className='hidden gap-x-10 items-center lg:flex'>
      <Link href= "/" className='bg-[#ad67c9] py-2 px-5 font-semibold text-lg rounded-full'>Home</Link>
      <Link href= "/">Pricing</Link>
      <Link href= "/">Conatct</Link>
      <Link href= "/auth/sign-in">
      <Button className='text-base flex gap-x-2'>
       <User fill='#000'/>
        Login</Button>
      </Link>    
    </div>
    </div>
  );
};

export default LandingPageNavBar;