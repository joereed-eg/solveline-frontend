import { Calendar } from 'primereact/calendar'
import React, { useEffect, useRef, useState } from 'react'
import 'primereact/resources/themes/saga-blue/theme.css'; // Theme CSS
import 'primereact/resources/primereact.min.css'; // Core CSS
import 'primeicons/primeicons.css'; // Icons CSS
import { IoSearchOutline } from 'react-icons/io5';
import { getAppointmentList, resetAppointmentList } from '@/redux/actions/appointmentActions';
import { useDispatch } from 'react-redux';
import { IoMdClose } from 'react-icons/io';
import { BiX } from 'react-icons/bi';
import { IAppointmentData } from '@/types/appointmentInterface';
import moment from 'moment';
import { OverlayPanel } from 'primereact/overlaypanel';

// Your component code goes here

type Props = {
  searchQuery: any;
  setSearchQuery: any;
  dates: any;
  setDates: any;
}


const AppointmentsFilter = (props: Props) => {
  const dispatch = useDispatch()
  const op = useRef<OverlayPanel>(null);
  const calendarRef = useRef<any>(null);

  const { searchQuery, setSearchQuery, dates, setDates } = props

  useEffect(() => {
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

    const appointmentPayload = {
      search: searchQuery || '',
      date_range: dates,
      page: 1,
    }
    dispatch(getAppointmentList(appointmentPayload))

    if (calendarRef.current && calendarRef.current.hide) {
      calendarRef?.current?.hide();
    }

  }, [searchQuery, dates?.length > 1 && dates[1] !== null])

  const handleClear = () => {
    setDates(null);
  };

  const handleSearchClick = (e: any) => {
    if (op.current) {
      op.current?.toggle(e);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchQuery(e.currentTarget.value);
      op.current?.hide(); // Hide OverlayPanel
    }
  };
  const handleApplyClick = () => {
    const searchInput = document.getElementById('searchName') as HTMLInputElement | null; // Explicitly specify the type
    const searchValue = searchInput?.value ?? ''; // Use optional chaining to access value safely
    setSearchQuery(searchValue);
    op.current?.hide(); // Hide OverlayPanel
  };

  return (
    <div className='border-t px-5 py-4'>
      <div className="flex flex-wrap items-center justify-between">
        <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 py-2 pe-2">
          {/* <p className='text-[20px] font-semibold'> This week</p> */}
        </div>
        <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 py-2 pe-2 filter_datePicker filter_appoinments flex justify-between gap-3">
          <div className='relative w-full'>
            <input
              onClick={handleSearchClick}
              placeholder='Search...'
              className='border w-full p-2 rounded-[8px]'
              value={searchQuery}
            />
            <OverlayPanel ref={op}>
              <div className='mb-2'>
                <label htmlFor="searchName" className='text-[12px] font-medium text-black'>Search name</label>
              </div>
              <input
                id='searchName'
                placeholder='Search...'
                className='border w-full p-2 rounded-[8px] text-black text-[12px]'
                onKeyPress={handleKeyPress}
                autoFocus
                
              />
              <button className='btn btn-danger w-full btn-shadnow-danger mt-3 text-[14px] font-medium' onClick={handleApplyClick}>Apply</button>
            </OverlayPanel>
            <div className='absolute top-2 right-3 bg-white'>
              {searchQuery?.length > 0 ?
                <div onClick={() => setSearchQuery('')} className='cursor-pointer'>
                  <IoMdClose size={25} color='#FF5402' />
                </div>
                :
                <IoSearchOutline size={25} />
              }

            </div>
          </div>

          <Calendar
            value={dates}
            onChange={(e) => setDates(e.value)}
            selectionMode="range"
            readOnlyInput
            className='w-full w-100'
            placeholder='This week'
            dateFormat="dd/mm/yy" // Specify the date format using dateFormat
            showIcon
            ref={calendarRef} 
            icon={
              dates && dates.length > 0 ? (
                <BiX
                  color='#FF5402'
                  size={25}
                  className='close_icon_filter'
                  onClick={handleClear}
                />
              ) : null
            }
          />
        </div>
        <div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentsFilter
