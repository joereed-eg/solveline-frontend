import { IRatingsList } from '@/types/providerServicesInterface'
import Image from 'next/image'
import React from 'react'

type Props = {
  ratingData: IRatingsList[]
}

const Reviews = (props: Props) => {
  return (
    <>
      {props?.ratingData && props.ratingData.map((items, index) => (
        <div className='border-b-[2px] pb-3 w-full mb-6' key={index}>
          <div className='md:flex justify-between items-center'>
            <div className='flex items-center'>
              <div className='w-[36px] h-[36px] bg-[#F6F6F6] rounded-full flex justify-center items-center capitalize'>
                {items?.from_user?.name && items.from_user.name.split('')[0]}
              </div>
              <div>
                <div className='review_text flex ps-3 items-center'>
                  <p className='text-[16px] '>{items.from_user?.name}</p>
                  <li className='review_count ps-2'>
                  </li>
                  <div className='flex ps-2 items-center'>
                    <span className='star pr-2'>
                      <Image src={'/images/icons/star_filled_icon.svg'} alt='star_filled_icon' width={18} height={18} />
                    </span>
                    <span className='rating_value pr-1'>{items?.value}</span>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
            <div className='md-pb-0 pb-3 md:text-end md:ps-0 ps-1'>
              <p className='text-[14px]'>{items?.created_at_label}</p>
            </div>
          </div>
          <div>
            <p className='text-[14px] leading-[22px] text-[#666666]'>{items?.description}</p>
          </div>
        </div>
      ))}

    </>
  )
}

export default Reviews