import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';
import { useTable, Row } from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@/redux/types';
import { PulseLoader } from 'react-spinners';
import { useInView } from 'react-intersection-observer'
// import { downloadInvoice, getCompanyWalletLedgerHistory } from '@/redux/actions/comanyUserActions';
import { IWalletHistory } from '@/types/userInterface';
import { getConsumerWalletHistory } from '@/redux/actions/userActionTypes';


type Props = {
    columns: any;
    dataList: IWalletHistory[];
    searchQuery: string
}

const ConsumerWalletHistoryTable = (props: Props) => {
    const dispatch = useDispatch()

    const initialPaymentHistoryParams = useMemo(
        () => ({
            page: 1,
        }),
        []
    );
    const walletHistoryLoader = useSelector((state: AppState) => state.userData.walletHistoryLoader)
    const walletHistoryMetaParams = useSelector((state: AppState) => state.userData.walletHistoryMetaParams)
    const isAuth = useSelector((state: AppState) => state.userData.userProfile.isAuth)


    const { ref, inView } = useInView({
        threshold: 0,
        initialInView: false
    }
    );


    const { columns, dataList, searchQuery } = props;

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
            paymentHistoryLength < walletHistoryMetaParams?.meta_params.total_count &&
            walletHistoryMetaParams?.meta_params?.hasMorePage === true &&
            Number(pageRequested) !== Number(walletHistoryMetaParams?.meta_params?.nextPage)
        ) {
            setPaymentHistoryParams((candidateParams) => {

                return { ...candidateParams, page: walletHistoryMetaParams?.meta_params.nextPage };
            });
            setScrollValue(true);
        }
    }, [inView, walletHistoryMetaParams?.meta_params.total_count, walletHistoryMetaParams?.meta_params?.hasMorePage]);

    useEffect(() => {
        if (
            scrollValue === true &&
            Number(pageRequested) !== Number(walletHistoryMetaParams?.meta_params.nextPage) &&
            walletHistoryMetaParams?.meta_params?.hasMorePage === true
        ) {
            setPageRequested(walletHistoryMetaParams?.meta_params.nextPage);
            let reqObj = {
                page: paymentHistoryParams.page,
                search: searchQuery || ""
            }
            dispatch(getConsumerWalletHistory(reqObj));
            setScrollValue(false);
        } else if (pageRequested === undefined) {
            setPageRequested(1);
        }
    }, [walletHistoryMetaParams?.meta_params?.hasMorePage, walletHistoryMetaParams?.meta_params.nextPage, paymentHistoryParams.page, dispatch,
        pageRequested, scrollValue]);


    return (
        <>
            <div className='max-w-[100%] overflow-auto pb-20'>
                <div className='table-responsive border-b-[0.5px] rounded-3xl bg-black'>
                    <table {...getTableProps()} className='upcoming_appoinments_table'>
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    <th>Name</th>
                                    <th>Amount</th>
                                    <th>Payment Date</th>
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            <>
                                {walletHistoryLoader &&

                                    <div className='absolute items-center py-20 h-[100%] top-0 w-full left-0 bottom-0 z-10 overlay_loader'>
                                        <PulseLoader color='#CB333B' />
                                    </div>
                                }
                                {rows.map((row: Row<IWalletHistory>, index: number) => {
                                    prepareRow(row);
                                    return (
                                        <>
                                            <tr {...row.getRowProps()} key={index}>
                                                <td className=''>
                                                    <div className='flex'>
                                                        <div>
                                                            <div className='w-[42px] min-h-[42px] max-h-[42px]'>
                                                                {row.original.service_name === "" ?
                                                                    <Image className='min-h-[42px] max-h-[42px] rounded-md object-cover object-center' src={`${row.original.company_image}`} alt='table_img' width={100} height={100} />
                                                                    :
                                                                    <Image className='min-h-[42px] max-h-[42px] rounded-md object-cover object-center' src={`${row.original.service_image}`} alt='table_img' width={100} height={100} />
                                                                }
                                                            </div>
                                                        </div>
                                                        <span className='pl-3'>
                                                            <span className='text-truncate-2 FaExclamationCircle_inline'>
                                                                {row.original.service_name.length > 0 &&
                                                                    <>{row.original.service_name}</>
                                                                }
                                                            </span>

                                                            <span className='block'>
                                                                {row.original.service_name.length > 0 ?
                                                                    <>

                                                                        <span className='userName'>
                                                                            {row.original.provider_name}
                                                                        </span>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        {row.original.company_name}
                                                                    </>
                                                                }
                                                            </span>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className='text-nowrap min-w-[250px] max-w-[250px]'>
                                                    <div className='flex items-center'>
                                                        <span className={`px-2 text-[14px] font-medium rounded-md  ${row.original.type === "credit" ? "text-[#008000]  bg-[#0080001A]" : "text-[#CB333B] bg-[#CB333B1A]"}`}>
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
                                            </tr>
                                            {row.original.refund && row.original.refund.map((refundItem, index) => (
                                                <React.Fragment key={index}>
                                                    <td className=''>
                                                        <div className='flex  ps-5'>
                                                            <div>
                                                                <div className='w-[42px] min-h-[42px] max-h-[42px]'>
                                                                    {row.original.service_name === "" ?
                                                                        <Image className='min-h-[42px] max-h-[42px] rounded-md object-cover object-center' src={`${row.original.company_image}`} alt='table_img' width={100} height={100} />
                                                                        :
                                                                        <Image className='min-h-[42px] max-h-[42px] rounded-md object-cover object-center' src={`${row.original.service_image}`} alt='table_img' width={100} height={100} />
                                                                    }
                                                                </div>
                                                            </div>
                                                            <span className='pl-3'>
                                                                <span className='text-truncate-2 FaExclamationCircle_inline'>
                                                                    {row.original.service_name.length > 0 &&
                                                                        <>{row.original.service_name}</>
                                                                    }
                                                                </span>

                                                                <span className='block'>
                                                                    {row.original.service_name.length > 0 ?
                                                                        <>

                                                                            <span className='userName'>
                                                                                {row.original.provider_name}
                                                                            </span>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            {row.original.company_name}
                                                                        </>
                                                                    }
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
                                                </React.Fragment>
                                            ))}

                                        </>
                                    );
                                })}
                            </>
                        </tbody>

                    </table>

                    <>
                        {<div className="h-25" ref={ref}></div>}
                    </>


                </div>
            </div>
        </>
    );
};

export default ConsumerWalletHistoryTable;
