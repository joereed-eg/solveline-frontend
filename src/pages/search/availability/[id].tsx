import { api } from '@/api-config/api'
import Layout from '@/components/Layout'
import LoadingAnimated from '@/components/loading/LoadingAnimated'
import NoDataGIF from '@/components/loading/NoDataFound'
import ProfileTopBar from '@/components/profile-top-bar/ProfileTopBar'
import TopNavbar from '@/components/top-navbar/TopNavbar'
import { IAvailabilityDataList, IProviderServiceDetails } from '@/types/providerServicesInterface'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaChevronLeft, FaMapMarker, FaStar } from 'react-icons/fa'

type CheckAvailabilityProps = {
    availabilityDataList: Record<string, IAvailabilityDataList[]>; // Use Record<string, ...> to represent an object with string keys
    providerProfileDetails: IProviderServiceDetails;

}


export default function CheckAvailability({ availabilityDataList, providerProfileDetails }: CheckAvailabilityProps) {

    const router = useRouter()
    const [isLoading, setLoading] = useState(true)
    const initialDay = 'monday';
    const [selectedDay, setSelectedDay] = useState(initialDay);


    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [])
    const handleDayClick = (day: React.SetStateAction<string>) => {
        setSelectedDay(day);
    };

 
    return (
        <Layout>
            <TopNavbar />
            <ProfileTopBar
                providerName={"Book the provider"}
            />
            {isLoading && <LoadingAnimated />}
            <div className='flex flex-wrap md:px-5 px-3'>
                <div className="md:w-1/4 md:min-h-[100vh] h-[100%]">
                    <div className='md:pe-5 sticky -top-16 mx-auto mt-2 pe-5 md:pt-5 pt-3'>
                        <div className='min-w-[110px] min-h-[110px] max-h-[110px] max-w-[110px]'>
                            <Image className='rounded-full min-w-[110px] min-h-[110px] max-h-[110px] max-w-[110px] object-cover' src={providerProfileDetails?.image} width={210} height={210} alt='userImg' />
                        </div>
                        <div className='title pt-3'>
                            <h2 className='text-[#000000] text-[26px] pb-1 font-medium text-truncate-1 max-w-[250px]'>{providerProfileDetails?.name}</h2>
                            <p className='text-[#666666] text-[16px] pb-1 font-medium'>{providerProfileDetails?.category}</p>
                            <p className='flex  text-[#666666] font-medium text-[14px]'>
                                <div className='pe-1 w-[20px] pt-1'>
                                    <Image src={'/images/icons/location_icon.svg'} width={13} height={15} className='min-w-[13px] min-h-[15px]' alt='location icon' />
                                </div>
                                <div className='text-truncate-2'> {providerProfileDetails?.address}</div>
                            </p>
                        </div>
                        <div className='flex pt-3 items-center rating_svg'>
                            {[...Array(5)].map((_, index) => (
                                <FaStar
                                    key={index}
                                    color={index < Math.floor(Number(providerProfileDetails?.rating?.average) || 0) ? '#FFA500' : '#E8E8E8'}
                                />
                            ))}
                            <span className='ps-2 text-[12px]'>({providerProfileDetails?.rating?.count || 0})</span>
                        </div>
                        <div className='pt-10'>
                            <Link href={`/search/profile/${router?.query?.id}`} className='w-100 btn btn-light btn-light-shadow flex justify-center items-center'><span className='pe-2'><FaChevronLeft color='black' />
                            </span>  Back to profile</Link>
                        </div>
                    </div>
                </div>
                <div className="md:w-3/4 md:px-10  md:border-l-[1px]">
                    <div className='md:px-5   md:pt-4 pt-8 hidden'>
                        <div>
                            <h3 className='title_text_expo pb-3 font-[600]'>Courses</h3>
                        </div>
                        <div className='border-[#E8E8E8] hover:border-[#FF5402] border-[1px] hover:border-[2px] h-[84px] flex items-center md:p-4 p-2 rounded-[10px] justify-between mb-3'>
                            <div>
                                <p className='font-medium'>Invigorating Yoga & Mindfulness Meditation Class</p>
                                <p className='flex items-center'><span><Image src={'/images/icons/watch.svg'} width={13} height={13} alt='watch icon' /> </span> <span className='text-[#666666] text-[14px] ps-2'>1h 30m</span></p>
                            </div>
                            <div>
                                <p className='text-[#000000] font-bold pb-4'>$80 <span className='text-[#B2B2B2] text-[12px] font-light'>/session</span></p>
                            </div>
                        </div>
                        <div className='border-[#E8E8E8] hover:border-[#FF5402] border-[1px] hover:border-[2px] h-[84px] flex items-center md:p-4 p-2 rounded-[10px] justify-between mb-3'>
                            <div>
                                <p className='font-medium'>Invigorating Yoga & Mindfulness Meditation Class</p>
                                <p className='flex items-center'><span><Image src={'/images/icons/watch.svg'} width={13} height={13} alt='watch icon' /> </span> <span className='text-[#666666] text-[14px] ps-2'>1h 30m</span></p>
                            </div>
                            <div>
                                <p className='text-[#000000] font-bold pb-4'>$80 <span className='text-[#B2B2B2] text-[12px] font-light'>/session</span></p>
                            </div>
                        </div>
                    </div>
                    {availabilityDataList[selectedDay] && availabilityDataList[selectedDay].length > 0 ?
                        <div className='md:px-5 md:pt-4 pt-8'>
                            <div>
                                <h3 className='title_text_expo pb-3 font-[600]'>Check availability</h3>

                                <div className='flex flex-wrap gap-4 pt-8'>

                                    <div className={`w-[30px] h-[30px]  bg-[#FFFFFF] border-[1px] flex justify-center items-center rounded-full shadow cursor-pointer hover:border-[#FF5402] ${!availabilityDataList['monday'] && 'opacity-30 pointer-events-none'}  ${selectedDay === 'monday' ? 'border-[#FF5402]' : ''}`} onClick={() => handleDayClick('monday')}>
                                        M
                                    </div>
                                    <div className={`w-[30px] h-[30px]  bg-[#FFFFFF] border-[1px] flex justify-center items-center rounded-full shadow cursor-pointer hover:border-[#FF5402] ${!availabilityDataList['tuesday'] && 'opacity-30 pointer-events-none'}  ${selectedDay === 'tuesday' ? 'border-[#FF5402]' : ''}`} onClick={() => handleDayClick('tuesday')}>
                                        T
                                    </div>
                                    <div className={`w-[30px] h-[30px]  bg-[#FFFFFF] border-[1px] flex justify-center items-center rounded-full shadow cursor-pointer hover:border-[#FF5402] ${!availabilityDataList['wednesday'] && 'opacity-30 pointer-events-none'}  ${selectedDay === 'wednesday' ? 'border-[#FF5402]' : ''}`} onClick={() => handleDayClick('wednesday')}>
                                        W
                                    </div>
                                    <div className={`w-[30px] h-[30px]  bg-[#FFFFFF] border-[1px] flex justify-center items-center rounded-full shadow cursor-pointer hover:border-[#FF5402] ${!availabilityDataList['thursday'] && 'opacity-30 pointer-events-none'}  ${selectedDay === 'thursday' ? 'border-[#FF5402]' : ''}`} onClick={() => handleDayClick('thursday')}>
                                        T
                                    </div>
                                    <div className={`w-[30px] h-[30px]  bg-[#FFFFFF] border-[1px] flex justify-center items-center rounded-full shadow cursor-pointer hover:border-[#FF5402] ${!availabilityDataList['friday'] && 'opacity-30 pointer-events-none'}  ${selectedDay === 'friday' ? 'border-[#FF5402]' : ''}`} onClick={() => handleDayClick('friday')}>
                                        F
                                    </div>
                                    <div className={`w-[30px] h-[30px]  bg-[#FFFFFF] border-[1px] flex justify-center items-center rounded-full shadow cursor-pointer hover:border-[#FF5402] ${!availabilityDataList['saturday'] && 'opacity-30 pointer-events-none'}  ${selectedDay === 'saturday' ? 'border-[#FF5402]' : ''}`} onClick={() => handleDayClick('saturday')}>
                                        S
                                    </div>
                                    <div className={`w-[30px] h-[30px]  bg-[#FFFFFF] border-[1px] flex justify-center items-center rounded-full shadow cursor-pointer hover:border-[#FF5402] ${!availabilityDataList['sunday'] && 'opacity-30 pointer-events-none'}  ${selectedDay === 'sunday' ? 'border-[#FF5402]' : ''}`} onClick={() => handleDayClick('sunday')}>
                                        S
                                    </div>

                                </div>
                            </div>

                            <div className='slot-container pt-10'>
                                <h3 className='text-[18px] pb-3 font-medium'>Working hours</h3>

                                {/* {availabilityDataList[selectedDay].map(slot => ( */}
                                {availabilityDataList[selectedDay] && availabilityDataList[selectedDay]?.map(slot => (
                                    <div key={slot.id} className='slot flex  items-center'>
                                        <div className={`w-[115px] h-[40px] my-2 bg-[#FFFFFF] border-[1px] flex justify-center items-center rounded-[8px] shadow `}>
                                            {slot.slot_start_time_label}
                                        </div>
                                        <p>
                                            <Image src="https://expoappbe.scaleupally.io/asset/management/common/img/svg/avail_slot_sep.svg" alt="SVG Image" width={20} height={10} />
                                        </p>
                                        <div className={`w-[115px] h-[40px] my-2 bg-[#FFFFFF] border-[1px] flex justify-center items-center rounded-[8px] shadow`}>
                                            {slot.slot_end_time_label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        :
                        <div className='pt-3'>
                            <NoDataGIF loading={true} />
                        </div>
                    }
                </div>
            </div>
        </Layout>
    )
}
export async function getServerSideProps(context: { query: { id: any } }) {
    try {
        const id = context.query.id;

        // Call the first API
        const availabilityRes = await api.get(`provider/${id}/availability`);
        let availabilityDataList = {};
        if (availabilityRes.status === 200) {
            availabilityDataList = availabilityRes.data.data;
        } else {
            throw new Error("Availability request failed with status " + availabilityRes.status);
        }

        // Call the second API
        const profileRes = await api.get(`provider-profile/${id}`);
        let providerProfileDetails = {};
        if (profileRes.status === 200) {
            providerProfileDetails = profileRes.data.data;
        } else {
            throw new Error("Profile request failed with status " + profileRes.status);
        }

        // Return both data as props
        return { props: { availabilityDataList, providerProfileDetails } };

    } catch (error) {
        console.error(error);

        // Handle the error gracefully
        return { props: { availabilityDataList: {}, providerProfileDetails: {} } };
    }
};
