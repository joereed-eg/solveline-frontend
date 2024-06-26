import LoadingAnimated from '@/components/loading/LoadingAnimated'
import { orderStatusUpdate } from '@/redux/actions/chatActions'
import { verifyFund } from '@/redux/actions/fundManagementActions'
import { AppState } from '@/redux/types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { IoMdCheckmark, IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'


const Processing = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const orderStatusUpdateLoader = useSelector((state: AppState) => state.chatData.orderStatusUpdateLoader)
    const orderStatus = useSelector((state: AppState) => state.chatData.orderStatus)
    const [paymentLoader, setpaymentLoader] = useState(true)
    const [statusAddFund, setStatusAddFund] = useState(false)
 
    useEffect(() => {
        if (router.isReady) {
            if (router?.query?.type === "company_fund") {
                dispatch(verifyFund(Number(router.query.id)))
                setStatusAddFund(true)
            } else {
                dispatch(orderStatusUpdate(Number(router.query.id)))
            }
        }
    }, [router])

    useEffect(() => {
        setTimeout(() => {
            if (!orderStatusUpdateLoader) {
                setpaymentLoader(false)
            }
        }, 2000);
    }, [orderStatusUpdateLoader])

 
    return (
        <div>
            <div className="card text-center h-[100vh] items-center flex justify-center">
                <div>
                    <div className="flex rounded-full h-[200px] w-[200px] bg-[#F8FAF5] mx-auto items-center justify-center">
                        {orderStatusUpdateLoader || paymentLoader ?
                            <LoadingAnimated />
                            :
                            <>
                                {orderStatus?.status ?

                                    <IoMdCheckmark size={100} color='#039855' />
                                    :

                                    <IoMdClose size={100} color='#FF5402' />
                                }
                            </>
                        }
                    </div>
                    {!orderStatusUpdateLoader && !paymentLoader &&

                        <>
                            {orderStatus?.status ?
                                <>
                                    <h1 className='text-[30px] text-[#039855]'>Success</h1>
                                   
                                    <p> {statusAddFund ? "Add fund" : "Appointment" } transaction successful!</p>
                                    <div className='flex pt-3'>
                                        <Link href={`/`} className='btn btn-light btn-light-shadow mx-2'>Home</Link>

                                        {statusAddFund ?
                                            <Link href={`/fund-management`} className='btn btn-danger btn-danger-shadow'>Back to fund management</Link>

                                            :
                                            <Link href={`/chat?${'messaging'}:${orderStatus?.chat_id}`} className='btn btn-danger btn-danger-shadow'>Back to chat</Link>

                                        }
                                    </div>

                                </>
                                :
                                <>
                                    <h1 className='text-[30px] text-[#FF5402]'>Payment error</h1>
                                    <div className='flex pt-3'>
                                        <Link href={`/`} className='btn btn-light btn-light-shadow mx-2'>Home</Link>
                                        {statusAddFund ?
                                            <Link href={`/fund-management`} className='btn btn-danger btn-danger-shadow'>Back to fund management</Link>

                                            :
                                            <Link href={`/chat?${'messaging'}:${orderStatus?.chat_id}`} className='btn btn-danger btn-danger-shadow'>Back to chat</Link>

                                        }
                                     </div>
                                </>
                            }
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Processing