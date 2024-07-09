import React, { useEffect } from 'react'
import RecommendedCoaches from '../recommended-coaches/RecommendedCoaches';
import { IProviderService } from '@/types/providerServicesInterface';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@/redux/types';
import Link from 'next/link';
import UpcomingAppointmentsTable from '../upcoming-appointments-table/UpcomingAppointmentsTable';
import 'primereact/resources/themes/saga-blue/theme.css'; // Importing PrimeReact theme CSS
import 'primereact/resources/primereact.min.css'; // Importing PrimeReact component CSS
import 'primeicons/primeicons.css'; // Importing PrimeIcons
import { getAppointmentList, resetAppointmentList } from '@/redux/actions/appointmentActions';
import { useRouter } from 'next/router';
import { IAppointmentData } from '@/types/appointmentInterface';
import { PulseLoader } from 'react-spinners';
const columns = [
  { Header: 'Appointment Time', accessor: 'appointmentTime' },
];

type Props = {
  servicesList: IProviderService[]
}

const WelcomePage = (props: Props) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const isAuth = useSelector((state: AppState) => state.userData?.userProfile?.isAuth)
  const appointmentList = useSelector((state: AppState) => state.appointmentData.appointmentList)
  const appointmentListLoader = useSelector((state: AppState) => state.appointmentData.appointmentListLoader)

  const itemsToShow = isAuth ? 4 : 20;
  // const services = props?.servicesList && props?.servicesList?.slice(0, itemsToShow);
  useEffect(() => {
    if (router.isReady) {
      let reqObj: IAppointmentData = {
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
      dispatch(resetAppointmentList(reqObj))
    }
  }, [router])

  useEffect(() => {
    if (isAuth) {
      if (router.isReady) {
        const appointmentPaylod = {
          search: '',
          page: 1,
        }
        dispatch(getAppointmentList(appointmentPaylod))
      }
    }
  }, [router])




  return (
    <div className='relative'>

      {isAuth &&
        <>
          {appointmentListLoader &&
            <div className='absolute items-center py-20 h-[100%] top-0 w-full left-0 bottom-0 z-10 overlay_loader'>
              <PulseLoader color='#FF5402' />
            </div>
          }
          <>
            {appointmentList?.data?.length > 0 &&
              appointmentList?.data?.filter(data =>  data?.is_reschedule_booking_allowed)?.length > 0 &&
              <>
                <div className='flex justify-between items-center pb-4 pt-2 md:px-5 px-3'>
                  <div className='w-full'>
                    <h1 className='section_title text-black'>Upcoming Appointments </h1>
                  </div>
                  <div className='text-right my-5 w-full'>
                    <Link href={'/appointments'} className='btn btn-light btn-light-shadow'>Manage Bookings</Link>
                  </div>
                </div>

                <UpcomingAppointmentsTable welcomePage={true} />
              </>
            }
          </>
        </>
      }
      <div className={` w-full md:px-5 px-3 pt-4 ${isAuth && appointmentList?.data?.length > 0 && appointmentList?.data?.filter(data =>  data?.is_reschedule_booking_allowed)?.length > 0 && "mt-[-40px]"}`}>

        <div className='md:flex justify-between items-center'>
          <div className=''>
            <h1 className='section_title text-black md:pb-0 pb-3'>Recommended Services</h1>
          </div>
          <div className='text-right md:pt-0 pt-3'>
            <Link href="/search" className='btn btn-light btn-light-shadow flex items-center justify-between'><span className='pr-2'>See More Providers</span> <svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" /></svg></Link>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 pt-5 pb-5'>
          <>
          {props?.servicesList?.length > 0 && props?.servicesList?.slice(0, isAuth ? 4 : 20)?.map((value, index) => (

                <div key={index}>
                  <RecommendedCoaches data={value} />
                </div>
              ))}
          </>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
