import Layout from '@/components/Layout'
import ChatTopBar from '@/components/navbars/ChatTopBar'
import { AppState } from '@/redux/types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NoDataGIF from '@/components/loading/NoDataFound'
import { useRouter } from 'next/router'
import TopNavbar from '@/components/top-navbar/TopNavbar'
import SearchModal from '@/components/search-modal/SearchModal'
import { PulseLoader } from 'react-spinners'
import { getConsumerWalletHistory, resetConsumerWalletData } from '@/redux/actions/userActionTypes'
import ConsumerWalletHistoryTable from '@/components/tables/ConsumerWalletHistoryTable'



const columns = [
    { Header: 'Appointment Time', accessor: 'appointmentTime' },
];


const PaymentHistory = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const walletHistoryData = useSelector((state: AppState) => state.userData.walletHistoryData)
    const walletHistoryLoader = useSelector((state: AppState) => state.userData.walletHistoryLoader)
    const parent_user_id = useSelector((state: AppState) => state.userData.userProfile.parent_user_id)

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (router.isReady) {
            dispatch(resetConsumerWalletData([]))

            let reqObj = {
                page: 1,
                search: searchQuery || ""
            }
            if(parent_user_id !== null){
                dispatch(getConsumerWalletHistory(reqObj));
            }
        }
    }, [router, searchQuery])


    return (
        <Layout>
            <TopNavbar />
            <ChatTopBar title="Wallet Ledger" />

            <div className='tab_content px-5 py-4 border-t pt-10'>
              
                {walletHistoryLoader && walletHistoryData?.length === 0 &&

                    <div className='absolute items-center py-20 h-[100%] top-0 w-full left-0 bottom-0 z-10 overlay_loader'>
                        <PulseLoader color='#FF5402' />
                    </div>
                }
                {walletHistoryData?.length > 0 &&
                    <ConsumerWalletHistoryTable columns={columns} dataList={walletHistoryData} searchQuery={searchQuery} />
                }
                {walletHistoryData?.length === 0 && !walletHistoryLoader &&
                    <div className='pt-3'>
                        <NoDataGIF loading={true} />
                    </div>
                }
            </div>
        </Layout>
    )
}

export default PaymentHistory
