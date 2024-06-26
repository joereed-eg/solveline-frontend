import React, { useEffect, useState } from 'react'
import { Dialog } from 'primereact/dialog';
import Image from 'next/image';
import { IProviderService } from '@/types/providerServicesInterface';
import 'primereact/resources/themes/saga-blue/theme.css'; // Theme CSS
import 'primereact/resources/primereact.min.css'; // Core CSS
import 'primeicons/primeicons.css'; // Icons CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AppState } from '@/redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { createChannel } from '@/redux/actions/chatActions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
type Props = {
    visible: boolean;
    onClose: () => void;
    data?: IProviderService
}


const ServicesRightModal = (props: Props) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const createChannelLoading = useSelector((state: AppState) => state.chatData.createChannelLoading)
    const isAuth = useSelector((state: AppState) => state.userData.userProfile.isAuth)

    const [activeTabe, setActiveTabe] = useState('basic')

    var settings = {
        dots: false,
        infinite: props?.data?.images?.length && props.data.images.length > 1 ? true : false,
        arrows: false,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        // fade: true,
        autoplaySpeed: 2500,
    };



    const createChannelHandler = (providerId: number) => {
        if (isAuth) {
            dispatch(createChannel(providerId))
        } else {
            toast.warning("To use that feature, please sign up or log in.")
            router.push('/signup')
        }
    }

    useEffect(() => {
        if (props?.data?.basic_price !== null && props?.data?.basic_price !== undefined) {
            setActiveTabe('basic');
        } else if (props?.data?.intermediate_price !== null && props?.data?.intermediate_price !== undefined) {
            setActiveTabe('intermediate');
        } else if (props?.data?.advance_price !== null && props?.data?.advance_price !== undefined) {
            setActiveTabe('premium');
        }
    }, [props.data]);
 
    return (
        <div className='services_modal z-50 bg-white'>
            <Dialog header="Services" visible={props.visible} position={"top-right"} onHide={() => props.onClose()} draggable={false} className='bg-white bottom-0 service_modal_right'>
                <div className='rounded-[12px] w-full pb-1 px-5'>
                    <div>
                        <div className='time flex items-center justify-between pt-2'>
                            <div className='text-[16px] font-[600]'>
                                <h4 className='text-[18px] pt-2 pb-2 text-truncate-2 max-h-[60px] text-black font-semibold'>{props?.data?.title}</h4>
                            </div>
                            <div className='card_rating flex items-center min-w-[115px] w-[115px] justify-end' style={{ minWidth: "100px" }}>
                                <span className='star pr-2'>
                                    <Image className='' src={'/images/icons/star_filled_icon.svg'} alt='star_filled_icon' width={18} height={18} />
                                </span>
                                <span className='rating_value pr-1'>{props?.data?.rating.average}</span>
                                <li className='review_count'>({props?.data?.rating.count})</li>
                            </div>
                        </div>
                        <div className='pt-2 pb-10 bg-[#E6E6E6] service_modal'>
                            <div className='relative'>
                                <Slider {...settings}>
                                    {props?.data?.images.map((value, index) => (
                                        <div key={index} className='max-h-[200px]'>
                                            <Image src={`${value?.file_link}`} className='w-full max-h-[200px] min-h-[200px] object-cover rounded-top-img service_modal_images' width={240} height={200} alt='watch-img' />
                                        </div>
                                    ))}

                                </Slider>
                                {props?.data?.youtube_link && props?.data?.youtube_link?.length > 0 &&
                                    <div className='absolute top-0 end-0 bg-gray-80000 p-2'>
                                        <a href={`${props?.data?.youtube_link}`} target='_blank'>
                                            <Image src={'/images/youtube_icon.png'} alt='youtubeicon' width={40} height={40} />
                                        </a>
                                    </div>
                                }
                            </div>
                            <div className='bg-box_service pb-5 border-[#E6E6E6] border'>
                                <div className='md:grid flex grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 service_feature bg-[#E6E6E6] '>
                                    {props?.data?.basic_price &&
                                        <div className={`text-center w-100 bg-red-300 cursor-pointer  py-3 border-r-[1px] info_tab  ${activeTabe == "basic" && "active"}`} onClick={() => setActiveTabe("basic")}>Basic</div>
                                    }
                                    {props?.data?.intermediate_price &&
                                        <div className={`text-center w-100 bg-red-300 cursor-pointer  py-3 border-r-[1px] border-t-0 info_tab  ${activeTabe == "intermediate" && "active"}`} onClick={() => setActiveTabe("intermediate")}>Intermediate</div>
                                    }
                                    {props?.data?.advance_price &&
                                        <div className={`text-center w-100 bg-red-300 cursor-pointer  py-3 info_tab  ${activeTabe == "premium" && "active"}`} onClick={() => setActiveTabe("premium")}>Premium</div>
                                    }
                                </div>
                                <div className='pt-4 px-5'>
                                    <article>
                                        <p className='text-[20px] font-bold text-black'>
                                            {activeTabe === "basic" ?
                                                <>
                                                    ${props?.data?.basic_price}
                                                </>
                                                : activeTabe === "intermediate" ?
                                                    <>
                                                        ${props?.data?.intermediate_price}
                                                    </>
                                                    : activeTabe === "premium" ?
                                                        <>
                                                            ${props?.data?.advance_price}
                                                        </>
                                                        : null
                                            }

                                        </p>


                                        <p className='text-[18px] font-medium py-2 text-black'>{props?.data?.title}</p>
                                        <p className='text-[16px] font-[400] text-[#666666]'>{props?.data?.description}</p>

                                        {/* <ul className='pt-8'>
                                            <li className='flex pb-3 '>
                                                <Image src={'/images/icons/check_dark.svg'} width={22} height={22} alt='check_dark.svg' />
                                                <span className='ps-2 text-[14px] font-[400] text-[#666666]'>Up tot 60 minutes</span>
                                            </li>
                                            <li className='flex pb-3 '>
                                                <Image src={'/images/icons/check_dark.svg'} width={22} height={22} alt='check_dark.svg' />
                                                <span className='ps-2 text-[14px] font-[400] text-[#666666]'>3 session</span>
                                            </li>
                                            <li className='flex pb-3 '>
                                                <Image src={'/images/icons/check_dark.svg'} width={22} height={22} alt='check_dark.svg' />
                                                <span className='ps-2 text-[14px] font-[400] text-[#666666]'>Personalized action plan</span>
                                            </li>
                                        </ul> */}
                                    </article>
                                    <div className='pt-4'>
                                        {/* <button className='btn btn-danger btn-danger-shadow w-100'>Continue</button> */}
                                        <button
                                            type="button"
                                            disabled={createChannelLoading}
                                            className='btn btn-danger btn-danger-shadow w-100'
                                            onClick={() => createChannelHandler((Number(router?.query?.id)))}
                                        >
                                            {createChannelLoading ? <PulseLoader color="#FFFFFF" /> : "Contact"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Dialog>

        </div>
    )
}

export default ServicesRightModal


