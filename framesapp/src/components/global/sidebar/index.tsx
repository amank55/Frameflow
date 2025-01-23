"use client"
import { Select, SelectContent, SelectTrigger, SelectValue } from '@radix-ui/react-select'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {
  activeWorkspaceId: string
}

const Sidebar = ({activeWorkspaceId}: Props) => {
  const router = useRouter()
  const onChangeActiveWorkSpace = (value: string) => {
    router.push(`/dashboard/${value}`)
  }
  return (
    <div className='bg-[#111111] flex-none relative p-3 h-full w-[170px] flex flex-col gap-4 items-center overflow-hidden'>
     <div className='bg-[#111111] justify-center items-center p-4 gap-2 mb-4 absolute top-0 left-0 right-0'>
      <Image
      src= "/frameflow.png"
      alt = "logo"
      height = {40}
      width = {40}
      />
      <p className='text-1xl font-extrabold'>frameflow</p>
      <Select defaultValue={activeWorkspaceId} onValueChange={ onChangeActiveWorkSpace}>
      <SelectTrigger className="mt-2 text-neutral-300 bg-transparent">
          <SelectValue placeholder="Select a workspace"></SelectValue>
        </SelectTrigger>
        <SelectContent ></SelectContent>
      </Select>
     </div>
    </div>
  )
}

export default Sidebar