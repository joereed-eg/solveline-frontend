import React, { useEffect } from 'react'
import AppointmentTable from '../tables/AppointmentTable';
import { useSelector } from 'react-redux';
import { AppState } from '@/redux/types';
import NoDataGIF from '../loading/NoDataFound';
import { PulseLoader } from 'react-spinners';
import PaymentHistoryTable from '../tables/PaymentHistoryTable';

const columns = [
  { Header: 'Appointment Time', accessor: 'appointmentTime' },
];
//
type Props = {
  welcomePage?: boolean;
  searchQuery?: any;
  dates?: any;

}


const UpcomingAppointmentsTable = (props: Props) => {
  const appointmentList = useSelector((state: AppState) => state.appointmentData.appointmentList)
  const appointmentListLoader = useSelector((state: AppState) => state.appointmentData.appointmentListLoader)
  const rescheduleAppontmentLoader = useSelector((state: AppState) => state.appointmentData.rescheduleAppontmentLoader)

  const { searchQuery, dates } = props
  return (
    <div className='md:px-5 px-3 appointmentList_scroll'>
      <div className='max-w-[100%] overflow-auto pb-20'>
        <>
          {appointmentListLoader &&
            <div className='absolute items-center py-20 h-[100%] top-0 w-full left-0 bottom-0 z-10 overlay_loader'>
              <PulseLoader color='#FF5402' />
            </div>
          }
          <>
            {appointmentList?.data.length > 0 &&
              appointmentList.data.filter(data => !props?.welcomePage || data.is_reschedule_booking_allowed).length > 0 &&
              <AppointmentTable searchQuery={searchQuery} dates={dates} columns={columns} dataList={appointmentList} welcomePage={props.welcomePage} />
            }
          </>
          {appointmentList?.data.length === 0 && !rescheduleAppontmentLoader && !appointmentListLoader &&
            <div className='pt-3'>
              <NoDataGIF loading={true} />
            </div>
          }
        </>
      </div>
    </div>
  );
}

export default UpcomingAppointmentsTable;
