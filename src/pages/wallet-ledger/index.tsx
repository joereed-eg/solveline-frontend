import Layout from '@/components/Layout'
import ChatTopBar from '@/components/navbars/ChatTopBar'
import { AppState } from '@/redux/types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NoDataGIF from '@/components/loading/NoDataFound'
import { useRouter } from 'next/router'
import TopNavbar from '@/components/top-navbar/TopNavbar'
import CopmanyPaymentHistoryTable from '@/components/tables/CopmanyPaymentHistoryTable'
import { getCompanyWalletLedgerHistory, resetPaymentData, resetWalletLedgerData } from '@/redux/actions/comanyUserActions'
import CopmanyWalletHistoryTable from '@/components/tables/CopmanyWalletHistoryTable'
import SearchModal from '@/components/search-modal/SearchModal'
import { PulseLoader } from 'react-spinners'



const columns = [
    { Header: 'Appointment Time', accessor: 'appointmentTime' },
];


const PaymentHistory = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const walletLedgerHistoryData = useSelector((state: AppState) => state.company.walletLedgerHistoryData)
    const walletLedgerHistoryLoader = useSelector((state: AppState) => state.company.walletLedgerHistoryLoader)

    const [searchQuery, setSearchQuery] = useState('');

     useEffect(() => {
        if (router.isReady) {
            dispatch(resetWalletLedgerData([]))
            
                let reqObj = {
                    page: 1,
                    search: searchQuery || ""
                }
                dispatch(getCompanyWalletLedgerHistory(reqObj));
          
        }
    }, [router, searchQuery])

    return (
        <Layout>
            <TopNavbar />
            <ChatTopBar title="Wallet Ledger" />

            <div className='tab_content px-5 py-4 border-t'>
                <div className='md:w-3/12 relative pb-4'>
                    <SearchModal searchQuery={searchQuery} setSearchQuery={setSearchQuery} paymentHistory={true}/>
                </div>
                {walletLedgerHistoryLoader && walletLedgerHistoryData?.length === 0 &&

                    <div className='absolute items-center py-20 h-[100%] top-0 w-full left-0 bottom-0 z-10 overlay_loader'>
                        <PulseLoader color='#CB333B' />
                    </div>
                }
                {walletLedgerHistoryData?.length > 0 &&
                    <CopmanyWalletHistoryTable columns={columns} dataList={walletLedgerHistoryData} searchQuery={searchQuery} />
                }
                {walletLedgerHistoryData?.length === 0 && !walletLedgerHistoryLoader &&
                    <div className='pt-3'>
                        <NoDataGIF loading={true} />
                    </div>
                }
            </div>
        </Layout>
    )
}

export default PaymentHistory
