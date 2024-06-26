import { getCompnayDashboardKpi } from '@/redux/actions/comanyUserActions'
import { AppState } from '@/redux/types'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import VerticalBarDemo from '../charts/VerticalBar'

 

const CompanyWelcomePage = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const compnayDashboardKpis = useSelector((state: AppState) => state.company.compnayDashboardKpis)

    useEffect(() => {
        if (router.isReady) {
            dispatch(getCompnayDashboardKpi())
        }
    }, [router])

    return (
        <div>
            <div className='md:px-5 px-2'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 pt-5 pb-5'>
                    <div className='bg-white rounded-lg shadow-sm p-5 border' id='total_employees'>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-3 items-center'>
                                <div>
                                    <div className=''>
                                        <h2 className='text-[22px] font-bold'>{compnayDashboardKpis?.total_employee}</h2>
                                    </div>
                                    <h2 className=' text-black font-medium'>Total Employees</h2>
                                </div>
                            </div>
                            <div>
                                <Image src="/images/group.png" width={50} height={50} alt='investment.png' />
                            </div>
                        </div>
                    </div>
                    <div className='bg-white rounded-lg shadow-sm p-5 border' id='allocated_amount'>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-3 items-center'>
                                <div>
                                    <div className=''>
                                        <h2 className='text-[22px] font-bold'>{compnayDashboardKpis?.total_amount_allocated_to_employee}</h2>
                                    </div>
                                    <h2 className=' text-black font-medium'>Total Allocated Amount</h2>
                                </div>
                            </div>
                            <div>
                                <Image src="/images/hand.png" width={50} height={50} alt='investment.png' />
                            </div>
                        </div>
                    </div>
                    <div className='bg-white rounded-lg shadow-sm p-5 border' id='amount_used_by_employees'>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-3 items-center'>
                                <div>
                                    <div className=''>
                                        <h2 className='text-[22px] font-bold'>{compnayDashboardKpis?.total_amount_used_by_employee}</h2>
                                    </div>
                                    <h2 className=' text-black font-medium'>Amount Used By Employees</h2>
                                </div>
                            </div>
                            <div>
                                <Image src="/images/investment.png" width={50} height={50} alt='investment.png' />
                            </div>
                        </div>
                    </div>
                    <div className='bg-white rounded-lg shadow-sm p-5 border' id='appointments_made_by_employees'>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-3 items-center'>
                                <div>
                                    <div className=''>
                                        <h2 className='text-[22px] font-bold'>{compnayDashboardKpis?.total_appointment_made_by_employee}</h2>
                                    </div>
                                    <h2 className=' text-black font-medium'>Appointments Made By Employees</h2>
                                </div>
                            </div>
                            <div>
                                <Image src="/images/appointment.png" width={50} height={50} alt='investment.png' />
                            </div>
                        </div>
                    </div>
                    <div className='bg-white rounded-lg shadow-sm p-5 border'id='deactivated_employees'>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-3 items-center'>
                                <div>
                                    <div className=''>
                                        <h2 className='text-[22px] font-bold'>{compnayDashboardKpis?.total_inactive_employee}</h2>
                                    </div>
                                    <h2 className=' text-black font-medium'>Deactivated Employees</h2>
                                </div>
                            </div>
                            <div>
                                <Image src="/images/delete-user.png" width={50} height={50} alt='investment.png' />
                            </div>
                        </div>
                    </div>
                    <div className='bg-white rounded-lg shadow-sm p-5 border' id="available_amount">
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-3 items-center'>
                                <div>
                                    <div className=''>
                                        <h2 className='text-[22px] font-bold'>{compnayDashboardKpis?.total_available_amount}</h2>
                                    </div>
                                    <h2 className=' text-black font-medium'>Total Available Amount</h2>
                                </div>
                            </div>
                            <div>
                                <Image src="/images/amount.png" width={50} height={50} alt='investment.png' />
                            </div>  
                        </div>
                    </div>

                </div>
                <div className=''>

                    {/* <VerticalBarDemo /> */}


                </div>
                {/* <DoughnutChartDemo /> */}
            </div>
        </div>
    )
}

export default CompanyWelcomePage