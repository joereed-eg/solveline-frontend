import { IProviderService } from '@/types/providerServicesInterface'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
    data?: IProviderService
}

const RecommendedCoaches = (props: Props) => {
    return (
        <>
            <div className='recommended_card'>
                <Link href={`search/profile/${props?.data?.provider_id}`}>
                    {props?.data?.images?.[0]?.file_link && (
                        <div className='card-img '>
                            <Image src={props.data.images[0].file_link} alt={"service-image"} width={274} height={154} className='w-full max-h-[154px] min-h-[154px] object-cover' />
                        </div>
                    )}

                    <div className='card-info'>
                        <h3 className='card-title text-truncate-1'>
                            {props?.data?.title}
                        </h3>
                        <div className='card_rating flex pt-2 items-center'>
                            <span className='star pr-2'>
                                <Image src={'/images/icons/star_filled_icon.svg'} alt='star_filled_icon' width={18} height={18} />
                            </span>
                            <span className='rating_value pr-1'>{props?.data?.rating?.average}</span>
                            <li className='review_count'>({props?.data?.rating?.count})</li>
                        </div>
                    </div>
                    <div className='card-footer flex justify-between items-center'>
                        <div className='flex items-center'>
                            {props?.data?.provider?.image &&
                                <Image src={props?.data?.provider?.image} alt='user_img' className='object-cover' width={100} height={100} />
                            }
                            <span className='userName pl-3 text-truncate-1 max-h-[20px]' style={{ maxWidth: "100px" }}>{props?.data?.provider?.name}</span>
                        </div>
                        <div>
                            <p className='text-[#000000] font-bold '>
                                ${props?.data?.basic_price !== null && props?.data?.basic_price !== undefined
                                    ? props?.data.basic_price
                                    : props?.data?.advance_price !== null && props?.data?.advance_price !== undefined
                                        ? props?.data.advance_price
                                        : props?.data?.intermediate_price !== null && props?.data?.intermediate_price !== undefined
                                            ? props?.data.intermediate_price
                                            : ""}
                                <span className='text-[#B2B2B2] text-[12px] font-light'>/{props?.data?.provider?.rate_unit}</span></p>
                        </div>
                    </div>
                </Link>
            </div>

        </>
    )
}

export default RecommendedCoaches