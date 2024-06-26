import { api } from '@/api-config/api'
import Layout from '@/components/Layout'
import Faq from '@/components/faqs/Faq'
import LoadingAnimated from '@/components/loading/LoadingAnimated'
import NoDataGIF from '@/components/loading/NoDataFound'
import Photos from '@/components/photos-gallery/Photos'
import ProfileTopBar from '@/components/profile-top-bar/ProfileTopBar'
import Reviews from '@/components/reviews/Reviews'
import Services from '@/components/services/Services'
import TopNavbar from '@/components/top-navbar/TopNavbar'
import { getFeedbackList, resetFeedbackList } from '@/redux/actions/appointmentActions'
import { createChannel } from '@/redux/actions/chatActions'
import { AppState } from '@/redux/types'
import { IFeedbackListPaylod } from '@/types/appointmentInterface'
import { IProviderServiceDetails } from '@/types/providerServicesInterface'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import ReactPlayer from 'react-player'
import { useDispatch, useSelector } from 'react-redux'
import { PulseLoader } from 'react-spinners'
import { toast } from 'react-toastify'


interface ProviderServiceDetailsProps {
  providerProfileDetails: IProviderServiceDetails;
}

export default function Profile({ providerProfileDetails }: ProviderServiceDetailsProps) {
  const dispatch = useDispatch()
  const router = useRouter()

  const createChannelLoading = useSelector((state: AppState) => state.chatData.createChannelLoading)
  const ratingList = useSelector((state: AppState) => state.appointmentData.ratingList)
  const ratingListLoader = useSelector((state: AppState) => state.appointmentData.ratingListLoader)
  const isAuth = useSelector((state: AppState) => state.userData.userProfile.isAuth)

  const [isLoading, setLoading] = useState(true)
  const [moreReviewsPageCount, setMoreReviewsPageCount] = useState(1)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])

  const createChannelHandler = (providerId: number) => {
    if (isAuth) {
      dispatch(createChannel(providerId))
    } else {
      toast.warning("To use that feature, please sign up or log in.")
      router.push('/signup')
    }
  }

   useLayoutEffect(() => {
    if (router.isReady) {
      let reqObj = {
        data: [],
        meta_params: {
          current_page: 0,
          hasMorePage: false,
          last_page: 0,
          nextPage: 0,
          path: '',
          per_page: 0,
          total_count: 0,
        }
      }
      dispatch(resetFeedbackList(reqObj))
    }
  }, [router])



  useEffect(() => {
    // if (router.isReady) {

    let feedbackList = {
      page: moreReviewsPageCount,
      id: router.query.id
    };
    dispatch(getFeedbackList(feedbackList));
    // }
  }, [moreReviewsPageCount]);



  return (

    <div>

      <Layout>
        <TopNavbar />
        <ProfileTopBar providerName={providerProfileDetails?.name} />
        {isLoading && <LoadingAnimated />}

        {providerProfileDetails?.name ?
          <div className='flex flex-wrap md:px-6 px-3'>
            <div className="md:w-1/4 md:border-r-[1px] min-h-full w-full mx-auto">
              <div className='md:pe-5 sticky -top-16 mx-auto mt-2 pe-5 md:pt-5 pt-3'>
                <div className='min-w-[110px] min-h-[110px] max-h-[110px] max-w-[110px]'>
                  <Image className='rounded-full min-w-[110px] min-h-[110px] max-h-[110px] max-w-[110px] object-cover' src={providerProfileDetails?.image} width={110} height={110} alt='userImg' />
                </div>
                <div className='title pt-3'>
                  <h2 className='text-[#000000] text-[26px] pb-1 font-medium text-truncate-1 max-w-[250px]'>{providerProfileDetails?.name}</h2>
                  <p className='text-[#666666] text-[16px] pb-1 font-medium'>{providerProfileDetails?.specialization}</p>
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
                  {router?.asPath?.split('?')?.[1] !== "type=a" &&
                    <>
                      <Link href={`/search/availability/${providerProfileDetails?.id}`} className='w-full btn btn-danger my-3 btn-danger-shadow block text-center'>Check availability</Link>

                      <button
                        type="button"
                        disabled={createChannelLoading}
                        className='w-full btn btn-light btn-light-shadow' onClick={() => createChannelHandler(providerProfileDetails?.id)}
                      >
                        {createChannelLoading ? <PulseLoader color="#CB333B" /> : "Contact"}
                      </button>
                    </>
                  }
                </div>

              </div>
            </div>
            <div className="md:w-3/4 w-full md:pl-7 md:pr-3">
              <div className='md:px-5 pt-4'>

                {/* ========== VIDEO SECTION START ============ */}
                {/* <h3 className='title_text_expo font-[600]'>Invigorating Yoga & Mindfulness Meditation Class</h3> */}

                <div className='video_card pt-4'>
                  <ReactPlayer
                    url={providerProfileDetails?.youtube_link}
                    width="100%"
                    height="420px"
                    controls={true}
                    className="rounded-lg"
                  />
                </div>
                {/* ========== VIDEO SECTION END ============ */}


                {/* ========== ABOUT SECTION START ============ */}
                <div className='about_section pt-10'>
                  <h3 className='title_text_expo pb-3 font-medium'>About</h3>
                  <p className='text-[14px] text-[#666666] leading-[22px] font-medium'>{providerProfileDetails?.about_us}</p>
                </div>
                {/* ========== ABOUT SECTION END ============ */}


                {/* ========== Services SECTION START ============ */}
                <div className='services pt-10'>
                  <div className='flex justify-between items-center'>
                    <div>
                      <h3 className='title_text_expo pb-3 font-medium'>Services</h3>
                    </div>
                  </div>
                  <div className='pt-4 pb-7'>
                    {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-3"> */}
                    <Services data={providerProfileDetails?.services} isModal={true} />
                    {/* </div> */}
                  </div>
                </div>
                {/* ========== Services SECTION END ============ */}

                {/* ========== Services GALLERY SECTION START ============ */}
                {providerProfileDetails?.feature_resources?.length > 0 &&
                  <div className='pt-7'>
                    <div>
                      <h3 className='title_text_expo font-medium'>Featured Resources</h3>
                    </div>
                    <h3 className='text-[14px] text-[#666666] pb-3 font-medium'>{providerProfileDetails?.feature_resources?.length} Photos</h3>

                    <Photos data={providerProfileDetails?.feature_resources} />
                  </div>
                }


                {/* ========== Services GALLERY SECTION EDND ============ */}
                {ratingList?.data && ratingList?.data?.length > 0 && (

                  <div className='pt-10'>
                    <h3 className='title_text_expo pb-3'>Reviews <span className='text-[16px] text-[#666666]'>({providerProfileDetails?.rating?.count})</span></h3>
                    <Reviews ratingData={ratingList?.data} />

                    {ratingList?.meta_params.hasMorePage &&
                      <div className='text-center'><button disabled={ratingListLoader} className='btn btn-light btn-light-shadow' onClick={() => setMoreReviewsPageCount(moreReviewsPageCount + 1)}>
                        {ratingListLoader ? <PulseLoader color="#CB333B" /> : "See more"}
                      </button></div>
                    }
                  </div>
                )}

                {/* ========== FAQ GALLERY SECTION START ============ */}
                {providerProfileDetails?.faq.length > 0 &&
                  <div className='py-10 '>
                    <h3 className='title_text_expo pb-3 font-medium'>FAQ</h3>
                    <Faq data={providerProfileDetails?.faq} />
                  </div>
                }
              </div>
            </div>
          </div>
          : <>
            <div className='min-h-full items-center flex justify-center'>
              <div className='pt-3'>
                <NoDataGIF loading={true} />
              </div>
            </div>
          </>}
      </Layout>
    </div>
  )
}




export async function getServerSideProps(context: { query: { id: any } }) {
  try {
    const id = context.query.id;
    const res = await api.get(`provider-profile/${id}`);

    if (res.status !== 200) {
      throw new Error("Request failed with status " + res.status);
    }
    const providerProfileDetails = res.data.data;
    return { props: { providerProfileDetails } };
  } catch (error) {
    console.error(error);

    // Handle the error gracefully, you can choose to return an empty `testData` object or a custom error message
    return { props: { providerProfileDetails: {} } };
  }
};