import { IFeatureResources } from '@/types/providerServicesInterface'
import Image from 'next/image'
import React, { useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CenterModal from '@/modals/CenterModal';
import { PulseLoader } from 'react-spinners';
import ReactPlayer from 'react-player';
import { IoDocumentAttach } from 'react-icons/io5';
type Props = {
  data: IFeatureResources[]
}

const Photos = (props: Props) => {

  const [featureModal, setFeatureModal] = useState(false);
  const [featureInfo, setFeatureInfo] = useState<IFeatureResources>();


  var settings = {
    dots: false,
    infinite: props?.data?.length > 4 ? true : false,
    arrows: false,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
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

  const featureModalHandler = (data: any) => {
    setFeatureModal(true)
    setFeatureInfo(data)

  }

  return (
    <>
      <Slider {...settings}>
        {props?.data?.map((value, index) => (
          <div className='cursor-pointer px-2' key={index}>
            <div onClick={() => { featureModalHandler(value) }}>
              <Image src={value.image} className='w-full object-cover min-h-[179px] rounded-[8px] max-h-[179px]' width={179} height={179} alt='userImg' />
            </div>
          </div>
        ))}
      </Slider>

      <CenterModal
        setVisible={setFeatureModal}
        visible={featureModal}
        title='Featured resource details'
      >
        <div className='pb-4'>

          <div className='py-2'>
            <div className='block'>
              <div className='video_card px-4'>
                {featureInfo?.youtube_link &&   <ReactPlayer
                  url={featureInfo?.youtube_link}
                  width="100%"
                  height="200px"
                  controls={true}
                  className="rounded-lg w-100"
                />}
              
              </div>
            </div>
          </div>
          <div className='py-2 md:px-0 px-4'>
            {featureInfo?.document?.url &&
              <div>
                <a href={`${featureInfo?.document?.url}`} target='_blank' className='flex items-center text-black justify-start md:ps-4 pb-4 font-medium'><IoDocumentAttach /> View Document</a>
              </div>
            }
            <div className='block md:ps-5'>
              <span className='md:w-4/12 w-full font-medium text-black'>Title:</span>
              <span className=' md:inline block text-truncate-2 '>{featureInfo?.title}  </span>
            </div>
          </div>
          <div className='py-2 md:px-0 px-4'>
            <div className='block md:ps-5'>
              <span className='md:w-4/12 w-full font-medium text-black block'>Description:</span>
              <span className=' md:inline block'>{featureInfo?.description}  </span>
            </div>
          </div>
        </div>
      </CenterModal>
    </>

  )
}

export default Photos