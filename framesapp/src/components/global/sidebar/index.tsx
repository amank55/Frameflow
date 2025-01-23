import Image from 'next/image'
import React from 'react'

type Props = {
  activeWorkspaceId: string
}

const Sidebar = ({activeWorkspaceId}: Props) => {
  return (
    <div className='bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden'>
     <div className='bg-[#111111] justify-center items-center p-4 gap-2 mb-4 absolute top-0 left-0 right-0'>
      <Image
      src= "/frameflow.png"
      alt = "logo"
      height = {40}
      width = {40}
      />
      <p className='text-2xl'>Frameflow</p>
     </div>
    </div>
  )
}

export default Sidebar