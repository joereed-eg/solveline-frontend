import Link from 'next/link'
import React from 'react'
import { FaChevronRight } from 'react-icons/fa'

type Props = {
  providerName?:string
}

const ProfileTopBar = (props: Props) => {
  return (
    <div className='border-b-2 sticky top-0 w-full bg-white z-50'>
      <div className='w-full flex items-center p-3'>
         <span className='text-[#666666] flex items-center'><Link href="/">Search</Link> <span className='px-3'><FaChevronRight size={12} /></span> </span>  <span className='font-medium text-[18px] text-truncate-1 max-w-[300px]'>{props?.providerName}</span>
      </div>
    </div>
  )
}

export default ProfileTopBar