"use client";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem, SelectGroup, SelectLabel } from '@radix-ui/react-select';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  activeWorkspaceId: string;
};

const Sidebar = ({ activeWorkspaceId }: Props) => {
  const router = useRouter();
  const onChangeActiveWorkSpace = (value: string) => {
    router.push(`/dashboard/${value}`);
  };

  return (
    <div className='bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden'>
      <div className='bg-[#111111] justify-center items-center p-4 gap-2 mb-4 absolute top-0 left-0 right-0'>
        <Image
          src="/frameflow.png"
          alt="logo"
          height={40}
          width={40}
        />
        <p className='text-2xl font-extrabold'>frameflow</p>
        <Select defaultValue={activeWorkspaceId} onValueChange={onChangeActiveWorkSpace}>
          <SelectTrigger className="mt-2 text-neutral-300 bg-transparent">
            <SelectValue placeholder="Select a workspace" />
          </SelectTrigger>
          <SelectContent className='bg-[#111111] backdrop-blur-xl'>
            <SelectGroup>
              <SelectLabel>Workspaces</SelectLabel>
              <SelectItem value="workspace1">Workspace 1</SelectItem>
              <SelectItem value="workspace2">Workspace 2</SelectItem>
              <SelectItem value="workspace3">Workspace 3</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Sidebar;