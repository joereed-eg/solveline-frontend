import { ISetSearchHistory } from '@/types/providerServicesInterface';
import moment from 'moment';
import Image from 'next/image';
import React from 'react';

import { FaStar, FaTimes } from 'react-icons/fa';

type Props = {
  historyData: any;
  setPriceRangeHandler: any;
  setDateTime12h: any;
  specializationOptions: any;
  setSelecteSpecialization: any
  setSelectedRatingOptionsItems: any
  setSearchQuery: any

};


const HistoryFilter = (props: Props) => {
console.log(props.historyData, "232323")
   return (
    <div className='flex overflow-x-auto'>
      <>
 
        {props?.historyData.name === null || props?.historyData.name === '' ?
          null
          :
          <div className='history_card bg-[#F8F8F8]  rounded-[8px] my-2 py-3 me-2 px-3'>

            <div className='flex items-center'>
              <span className='text-[#666666]'>Name:</span>
              <span className='text-[#000000] ps-3 text-nowrap'>{props?.historyData.name}</span>
              <span className='text-[#000000] ps-2 cursor-pointer' onClick={() => props?.setSearchQuery('')}>
                <Image src={'./images/icons/close_icon.svg'} className='min-w-[12px]' width={12} height={12} alt='close icon' />
              </span>
            </div>
          </div>
        }
      </>

      <>
        {props?.historyData?.availability === null || props?.historyData?.availability.length <= 0 ?
          null
          :
          <>
            <div className='history_card bg-[#F8F8F8]  rounded-[8px] my-2 py-3 me-2 px-3'>
              <div className='flex items-center'>
                <span className='text-[#666666] '>Availability:</span>
                <span className='text-[#000000] ps-3 text-nowrap'>{
                  moment(props?.historyData?.availability, 'YYYY-MM-DD').format('MMM, DD YYYY')}
                </span>
                <span className='text-[#000000] ps-2 cursor-pointer' onClick={() => props?.setDateTime12h(null)}>
                  <Image src={'./images/icons/close_icon.svg'} className='min-w-[12px]' width={12} height={12} alt='close icon' />
                </span>
              </div>
            </div>
          </>

        }
      </>

      <>
     {console.log(props?.historyData?.category,'aldksfal check this')}
        {props?.historyData?.category === null || props?.historyData?.category.length == 0 ?
          null
          :
          <div className='history_card bg-[#F8F8F8]  rounded-[8px] my-2 py-3 me-2 px-3'>
            <div className='flex items-center'>
              <span className='text-[#666666] '>Category:</span>
              <span className='text-[#000000] ps-3 text-nowrap'>
                {/* {props?.specializationOptions
                  // ?.filter((option: { value: any; }) => props?.historyData?.category?.includes(option.value))
                  // ?.map((option: { name: any; }) => option.name)
                  // ?.join(', ')
                  .flatMap(option => 
                    option.subcategories
                      .filter(subcategory => props?.historyData?.category?.includes(subcategory.id))
                      .map(subcategory => subcategory.name)
                  )
                  .join(', ')
                
                } */}
              </span>
              <span className='text-[#000000] ps-2 cursor-pointer' onClick={() => props?.setSelecteSpecialization([])}>
                <Image src={'./images/icons/close_icon.svg'} className='min-w-[12px]' width={12} height={12} alt='close icon' />
              </span>
            </div>
          </div>
        }
      </>

      <>

        {props?.historyData?.ratings === null || props?.historyData?.ratings.length == 0 ?
          null
          :
          <div className='history_card bg-[#F8F8F8]  rounded-[8px] my-2 py-3 me-2 px-3'>
            <div className='flex items-center'>
              <span className='text-[#666666] '>Rating:</span>
              <span className='text-[#000000] ps-3 text-nowrap flex items-center'> <FaStar color='#FFA500' /> <span className='ps-2'>{props?.historyData?.ratings}</span></span>
              <span className='text-[#000000] ps-2 cursor-pointer' onClick={() => props?.setSelectedRatingOptionsItems([])}>
                <Image src={'./images/icons/close_icon.svg'} className='min-w-[12px]' width={12} height={12} alt='close icon' />
              </span>
            </div>
          </div>
        }
      </>

      <>
        {(
          (props?.historyData?.start_price === '0' || props?.historyData?.start_price === '1') &&
          (props?.historyData?.end_price === '0' || props?.historyData?.end_price === '1000')
        ) ?
          null
          :
          <div className='history_card bg-[#F8F8F8]  rounded-[8px] my-2 py-3 me-2 px-3'>
            <div className='flex items-center'>
              <p className='flex items-center'><span className='text-[#666666] '>From: </span> <span className='font-bold ps-2'>${props?.historyData?.start_price}</span> </p>
              <p className='text-[#666666] ps-2 text-nowrap '> To :</p>
              <p className='text-[#000000]  text-nowrap flex items-center'><span className='ps-2 font-bold'> ${props?.historyData?.end_price}</span></p>
              <p className='text-[#000000] ps-2 cursor-pointer' onClick={() => props?.setPriceRangeHandler([0, 1000])}>
                <Image src={'./images/icons/close_icon.svg'} className='min-w-[12px]' width={12} height={12} alt='close icon' />
              </p>
            </div>
          </div>
        }
      </>


    </div>
  );
};

export default HistoryFilter;
