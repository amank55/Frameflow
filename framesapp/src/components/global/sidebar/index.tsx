"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { useQueryData } from '@/hooks/useQueryData';
import { WorkspaceProps } from '@/types/index.type';
import { getWorkSpaces } from '@/actions/workspace';
//import { getWorkSpaces } from '@/services/workspaceService'; // Adjust the import path as needed

type Props = {
  activeWorkspaceId: string;
};

const Sidebar = ({ activeWorkspaceId }: Props) => {
  const router = useRouter();

  const { data, isFetched } = useQueryData(['user-workspaces'],getWorkSpaces)
  const { data: workspace } = data as WorkspaceProps
  const onChangeActiveWorkSpace = (value: string) => {
    router.push(`/dashboard/${value}`);
  };

  return (
    <div className='bg-[#111111] flex-none relative p-3 h-full w-[180px] flex flex-col gap-4 items-center overflow-hidden'>
      <div className='bg-[#111111] justify-center items-center p-4 gap-2 mb-4 absolute top-0 left--1 right-0'>
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
             <Separator/>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Sidebar;