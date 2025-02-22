import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';
import { useTable, Row } from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@/redux/types';
import { PulseLoader } from 'react-spinners';
import { useInView } from 'react-intersection-observer'
import { IPaymentHistoryData } from '@/types/userInterface';
import { downloadInvoice, getPaymentHistory } from '@/redux/actions/userActionTypes';


type Props = {
    columns: any;
    dataList: IPaymentHistoryData[];
    welcomePage?: boolean
}

const PaymentHistoryTable = (props: Props) => {
    const dispatch = useDispatch()

    const initialPaymentHistoryParams = useMemo(
        () => ({
            page: 1,
        }),
        []
    );
    const appointmentListLoader = useSelector((state: AppState) => state.appointmentData.appointmentListLoader)
    const invoiceDownloadLoading = useSelector((state: AppState) => state.userData.invoiceDownloadLoading)
    const paymentHistoryMetaParams = useSelector((state: AppState) => state.userData.paymentHistoryMetaParams)
    const isAuth = useSelector((state: AppState) => state.userData.userProfile.isAuth)
    const [invoiceId, setInvoiceId] = useState<number>(0)


    const { ref, inView } = useInView({
        threshold: 0,
        initialInView: false
    }
    );


    const { columns, dataList } = props;

    const [paymentHistoryLength, setPaymentHistoryLength] = useState(0);
    const [pageRequested, setPageRequested] = useState(0);
    const [paymentHistoryParams, setPaymentHistoryParams] = useState(initialPaymentHistoryParams);
    const [scrollValue, setScrollValue] = useState<boolean>(false);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: dataList
    });


    useEffect(() => {
        setPaymentHistoryLength(dataList?.length);
    }, [dataList]);

    useEffect(() => {
        if (
            inView === true &&
            paymentHistoryLength < paymentHistoryMetaParams?.meta_params.total_count &&
            paymentHistoryMetaParams?.meta_params?.hasMorePage === true &&
            Number(pageRequested) !== Number(paymentHistoryMetaParams?.meta_params?.nextPage)
        ) {
            setPaymentHistoryParams((candidateParams) => {

                return { ...candidateParams, page: paymentHistoryMetaParams?.meta_params.nextPage };
            });
            setScrollValue(true);
        }
    }, [inView, paymentHistoryMetaParams?.meta_params.total_count, paymentHistoryMetaParams?.meta_params?.hasMorePage]);

    useEffect(() => {
        if (
            scrollValue === true &&
            Number(pageRequested) !== Number(paymentHistoryMetaParams?.meta_params.nextPage) &&
            paymentHistoryMetaParams?.meta_params?.hasMorePage === true
        ) {
            setPageRequested(paymentHistoryMetaParams?.meta_params.nextPage);
            let reqObj = {
                page: paymentHistoryParams.page,
            }
      
            // if(isAuth){
                dispatch(getPaymentHistory(reqObj));
                // }
        
            setScrollValue(false);
        } else if (pageRequested === undefined) {
            setPageRequested(1);
        }
    }, [paymentHistoryMetaParams?.meta_params?.hasMorePage, paymentHistoryMetaParams?.meta_params.nextPage, paymentHistoryParams.page, dispatch,
        pageRequested, scrollValue]);




    return (
        <>
            <div className='max-w-[100%] overflow-auto pb-20'>
                <div className='table-responsive border-b-[0.5px] rounded-3xl bg-black'>
                    <table {...getTableProps()} className='upcoming_appoinments_table'>
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    <th className='min-w-[400px] max-w-[400px]'>Session Type</th>
                                    <th>Amount</th>
                                    <th>Payment Date</th>
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            <>
                                {appointmentListLoader &&

                                    <div className='absolute items-center py-20 h-[100%] top-0 w-full left-0 bottom-0 z-10 overlay_loader'>
                                        <PulseLoader color='#FF5402' />
                                    </div>
                                }
                                {rows.map((row: Row<IPaymentHistoryData>, index: number) => {
                                    prepareRow(row);
                                    return (
                                        <>
                                            <tr {...row.getRowProps()}>

                                                <td className=''>
                                                    <div className='flex'>
                                                        <div>
                                                            <div className='w-[42px] min-h-[42px] max-h-[42px]'>
                                                                <Image className='min-h-[42px] max-h-[42px] rounded-md object-cover' src={`${row.original.image}`} alt='table_img' width={100} height={100} />
                                                            </div>
                                                        </div>
                                                        <span className='pl-3'>
                                                            <span className='text-truncate-2 FaExclamationCircle_inline'>
                                                                {row.original.service_name}
                                                            </span>

                                                            <span className='block userName'>
                                                                {row.original.provider_name}
                                                            </span>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className='text-nowrap min-w-[250px] max-w-[250px]'>
                                                    <div className='flex items-center'>
                                                        <span className='px-2 text-[14px] font-medium bg-[#FF54021A] rounded-md text-[#FF5402]'>
                                                            {row.original.amount}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className='text-nowrap min-w-[250px] max-w-[250px]'>
                                                    <div className='flex items-center'>
                                                        <div>
                                                            <Image className='' src={'/images/icons/watch.svg'} alt='table_img' width={20} height={20} />
                                                        </div>
                                                        <span className='ps-2 text-[14px] font-medium text-black'>
                                                            {row.original.created_at}
                                                        </span>
                                                    </div>
                                                </td>
                                                {/* Add the "View Details" button with a link based on the action property */}
                                                <td className='text-nowrap cursor-pointer'>
                                                    <div className='flex items-center'

                                                        onClick={() => {
                                                            !invoiceDownloadLoading &&
                                                                dispatch(downloadInvoice(row.original.id));
                                                            setInvoiceId(row.original.id)
                                                        }
                                                        }
                                                    >
                                                        <div>
                                                            <Image src={'/images/icons/invoice-download.svg'} alt='table_img' width={20} height={20} />
                                                        </div>
                                                        <span className='ps-2 text-[14px] font-medium text-black '>
                                                            {invoiceDownloadLoading && invoiceId === row?.original?.id ? <div className='flex items-end'>Downloading<PulseLoader color='#FF5402' size={4} /></div> : "  Download invoice"}
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>

                                            {row.original.refund && row.original.refund.map((refundItem, index) => (
                                                <React.Fragment key={index}>
                                                    <td className=''>
                                                        <div className='flex  ps-5'>
                                                            <div>
                                                                <div className='w-[42px] min-h-[42px] max-h-[42px]'>
                                                                    <Image className='min-h-[42px] max-h-[42px] rounded-md object-cover' src={`${row.original.image}`} alt='table_img' width={100} height={100} />
                                                                </div>
                                                            </div>
                                                            <span className='pl-3'>
                                                                <span className='text-truncate-2 FaExclamationCircle_inline'>
                                                                    {row.original.service_name}
                                                                </span>

                                                                <span className='block userName'>
                                                                    {row.original.provider_name}
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </td>
                                                    
                                                    <td className='text-nowrap min-w-[250px] max-w-[250px]'>
                                                    <div className='flex items-center'>
                                                        <span className='px-2 text-[14px] font-medium text-[#008000]  bg-[#0080001A] rounded-md'>
                                                            {refundItem.amount}
                                                        </span>
                                                    </div>
                                                </td>
                                                    <td className='text-nowrap min-w-[250px] max-w-[250px]'>
                                                        <div className='flex items-center'>
                                                            <div>
                                                                <Image className='' src={'/images/icons/watch.svg'} alt='table_img' width={20} height={20} />
                                                            </div>
                                                            <span className='ps-2 text-[14px] font-medium text-black'>
                                                                {refundItem.created_at}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className='text-nowrap '></td>
                                                </React.Fragment>
                                            ))}

                                        </>
                                    );
                                })}
                            </>
                        </tbody>

                    </table>

                    <>
                        {!props?.welcomePage && <div className="h-25" ref={ref}></div>}
                    </>


                </div>
            </div>
        </>
    );
};

export default PaymentHistoryTable;
