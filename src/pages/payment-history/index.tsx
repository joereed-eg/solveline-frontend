import Layout from '@/components/Layout'
import ChatTopBar from '@/components/navbars/ChatTopBar'
import { AppState } from '@/redux/types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NoDataGIF from '@/components/loading/NoDataFound'
import { useRouter } from 'next/router'
import TopNavbar from '@/components/top-navbar/TopNavbar'
import CopmanyPaymentHistoryTable from '@/components/tables/CopmanyPaymentHistoryTable'
import { getCompanyPaymentHistory, resetPaymentData } from '@/redux/actions/comanyUserActions'
import { PulseLoader } from 'react-spinners'

const columns = [
    { Header: 'Appointment Time', accessor: 'appointmentTime' },
];

const PaymentHistory = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const paymentHistoryData = useSelector((state: AppState) => state.company.paymentHistoryData)
    const paymentHistoryLoader = useSelector((state: AppState) => state.company.paymentHistoryLoader)


    useEffect(() => {
        if (router.isReady) {
            dispatch(resetPaymentData([]))
            // setTimeout(() => {
            let reqObj = {
                page: 1,
            }
            dispatch(getCompanyPaymentHistory(reqObj));
            // }, 1000);
        }
    }, [router])

    return (
        <Layout>
            <TopNavbar />
            <ChatTopBar title="Payment History" />
            <div className='tab_content px-5 py-8 border-t'>
                {paymentHistoryLoader && paymentHistoryData?.length === 0 &&
                    <div className='absolute items-center py-20 h-[100%] top-0 w-full left-0 bottom-0 z-10 overlay_loader'>
                        <PulseLoader color='#CB333B' />
                    </div>
                }
                {paymentHistoryData?.length > 0 &&
                    < CopmanyPaymentHistoryTable columns={columns} dataList={paymentHistoryData} />
                }
                {paymentHistoryData?.length === 0 && !paymentHistoryLoader &&
                    <div className='pt-3'>
                        <NoDataGIF loading={true} />
                    </div>
                }
            </div>
        </Layout>
    )
}

export default PaymentHistory
