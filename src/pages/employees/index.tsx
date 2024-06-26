import Layout from '@/components/Layout'
import ChatTopBar from '@/components/navbars/ChatTopBar'
import EmployeeTable from '@/components/tables/EmployeeTable'
import TopNavbar from '@/components/top-navbar/TopNavbar'
import { AppState } from '@/redux/types'
import { IEmployeeData, IEmployeeSearch } from '@/types/companyInterface'
import { Roles } from '@/types/userInterface'
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PulseLoader } from 'react-spinners'
import NoDataGIF from '@/components/loading/NoDataFound'
import EmployeeFilter from '@/components/search-filter/EmployeeFilter'

type Props = {
  welcomePage?: boolean;
}

const Employees = (props: Props) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const userProfile = useSelector((state: AppState) => state.userData.userProfile)
  const employeeList = useSelector((state: AppState) => state.company.employeeList)
  const employeeListLoader = useSelector((state: AppState) => state.company.employeeListLoader)


  const [searchQuery, setSearchQuery] = useState('');



  useEffect(() => {
    if (router.isReady) {
      if (userProfile.role !== Roles.COMPANY) {
        router.push('/')
      }
    }
  }, [router])



  const columns = [
    { Header: 'Appointment Time', accessor: 'appointmentTime' },
  ];


  return (
    <Layout>
      <TopNavbar />
      <ChatTopBar title="Employees" />
      <div className='px-5 border-t pt-5'>
        <>
          {employeeListLoader &&
            <div className='absolute items-center h-[100%] top-0 w-full left-0 bottom-0 z-10 overlay_loader'>
              <PulseLoader color='#FF5402' />
            </div>
          }
          <>

            <>
              <EmployeeFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              {employeeList?.data?.length > 0 &&
                <EmployeeTable columns={columns} dataList={employeeList} searchQuery={searchQuery} welcomePage={props.welcomePage} />
              }
            </>

          </>
          {employeeList?.data?.length === 0 && !employeeListLoader &&
            <div className='pt-3 '>
              <NoDataGIF loading={true} />
            </div>
          }
        </>
      </div>
    </Layout>
  )
}

export default Employees