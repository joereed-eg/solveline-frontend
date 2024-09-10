import ServicesRightModal from '@/modals/ServicesRightModal';
import { IProviderService } from '@/types/providerServicesInterface';
import Image from 'next/image';
import React, { useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

type Props = {
  data: IProviderService[];
  isModal?: boolean;
};

const Services = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const modalHandler = (index: number) => {
    setSelectedItemIndex(index);
    setVisible(true);
  };


  var settings = {
    dots: false,
    infinite: props?.data?.length > 3 ? true : false,
    arrows: false,
    speed: 2500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };



  return (
    <>
      <Slider {...settings}>
        {props?.data?.map((value, index) => {
          const originalRating = value?.rating.average ? Number(value.rating.average) : 0;
          const cappedRating = originalRating <= 0.1 ? 0 : Math.min(originalRating, 5);
          return (
            <div className='rounded-[12px] w-full px-3' key={index} onClick={() => modalHandler(index)}>
              <div className='cursor-pointer w-100'>
                <Image
                  src={value?.images[0].file_link}
                  width={274} height={154} className='w-full max-h-[154px] min-h-[154px] object-cover'
                  alt='watch-img'
                />
                <div>
                  <h4 className='text-[16px] pt-2 pb-2  text-truncate-1 max-h-[35px] font-medium '>{value?.title}</h4>
                  <hr />
                </div>
              </div>
              <div className='py-0'>
                <div className='time flex items-center justify-between pt-2'>
                  <div className='text-[16px] font-[600]'>From
                    ${value?.basic_price !== null && value?.basic_price !== undefined
                      ? value.basic_price
                      : value?.advance_price !== null && value?.advance_price !== undefined
                        ? value.advance_price
                        : value?.intermediate_price !== null && value?.intermediate_price !== undefined
                          ? value.intermediate_price
                          : ""}
                  </div>
                  <div className='card_rating flex items-center'>
                    <span className='star pr-2'>
                      <Image src={'/images/icons/star_filled_icon.svg'} alt='star_filled_icon' width={18} height={18} />
                    </span>
                    <span className='rating_value pr-1'>{cappedRating}</span>
                    <li className='review_count'>({value?.rating.count})</li>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider >

      {selectedItemIndex !== null && (
        <ServicesRightModal
          visible={visible}
          onClose={() => {
            setVisible(false);
            setSelectedItemIndex(null);
          }}
          data={props.data[selectedItemIndex]}
        />
      )
      }

    </>
  );
};

export default Services;
