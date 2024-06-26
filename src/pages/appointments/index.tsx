import Layout from '@/components/Layout'
import ChatTopBar from '@/components/navbars/ChatTopBar'
import AppointmentsFilter from '@/components/top-navbar/AppointmentsFilter'
import TopNavbar from '@/components/top-navbar/TopNavbar'
import UpcomingAppointmentsTable from '@/components/upcoming-appointments-table/UpcomingAppointmentsTable'
import { AppState } from '@/redux/types'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

type Props = {}

const Appointments = (props: Props) => {
    const router = useRouter()
    const isAuth = useSelector((state: AppState) => state.userData.userProfile?.isAuth)


    const [searchQuery, setSearchQuery] = useState('');
    const [dates, setDates] = useState<any>(null); 
    useEffect(() => {
      if(router.isReady){
        setDates(null)
      }
    }, [router])
    

    useEffect(() => {
        if (!isAuth) {
            router.push('/')
        }
    }, [isAuth])
    return (
        <>
            <Layout>
                <TopNavbar/>
                <ChatTopBar title="My Appointments" />
                 <AppointmentsFilter setSearchQuery={setSearchQuery} searchQuery={searchQuery} dates={dates} setDates={setDates}/>
                <UpcomingAppointmentsTable  searchQuery={searchQuery} dates={dates}/>
            </Layout>
        </>
    )
}

export default Appointments