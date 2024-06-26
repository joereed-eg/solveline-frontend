import React, { useRef, useState } from 'react';
import { useTable, Row } from 'react-table';
import Image from 'next/image';
import { FaPlus } from 'react-icons/fa';
import { IEmployeeListForFundAllocations, IEmployeeListForFundAllocationsData } from '@/types/fundManagementInterface';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { allocateFund } from '@/redux/actions/fundManagementActions';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import CenterModal from '@/modals/CenterModal';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup'

import { TbReceiptRefund } from "react-icons/tb";
import { emptyWalletAmount } from '@/redux/actions/comanyUserActions';
import { AppState } from '@/redux/types';



type Props = {
    columns: any;
    dataList: IEmployeeListForFundAllocations[];
    employeeListData: IEmployeeListForFundAllocationsData;
    setEmployeeListData?: any;
    setTotalBalance?: any;
    totalBalance?: any;
    isAllowAllocateFund?: boolean
    isChecked?: boolean;
    setAllAllocateFund?: any;
}

const FundManagementTable = (props: Props) => {
    const dispatch = useDispatch()
    const toast = useRef<Toast>(null); // Define the type of toast ref
    const emptyWalletAmountLoader = useSelector((state: AppState) => state.company.emptyWalletAmountLoader)

    const { columns, dataList, setEmployeeListData, isChecked, setAllAllocateFund, isAllowAllocateFund, totalBalance } = props;

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

    const [showTooltip, setShowTooltip] = useState(false);
    const [showTooltipWallet, setShowTooltipWallet] = useState(false);
    const [showTooltipButtonId, setShowTooltipButtonId] = useState<number | null>();
    const [visibleTopUpModal, setVisibleTopUpModal] = useState(false);
    const [employeeData, setEmployeeData] = useState<IEmployeeListForFundAllocations[]>();
    const [topUpModal, setTopUpModal] = useState(false);


    const handleDistributedFundChange = (event: React.ChangeEvent<HTMLInputElement>, id: any) => {
        const newValue = parseFloat(event.target.value);
        let oldDistributedFund = 0;
        // Update the distributed_fund for the specific item
        const updatedDataList = dataList?.map((item) => {
            if (item.id === id) {
                oldDistributedFund = item.distributed_fund || 0;
                return { ...item, distributed_fund: newValue || 0 };
            }
            return item;
        });
        // Calculate the total distributed_fund sum
        const totalDistributedFund = updatedDataList?.reduce((sum, item) => sum + (item.distributed_fund || 0), 0) || 0;
        // Set the updated data list
        setEmployeeListData(updatedDataList);
        // Set the total distributed_fund sum
        setAllAllocateFund(totalDistributedFund);
    }

    const handleKeyPress = (event: any, id: any) => {
        // Prevent non-numeric input
        if (!/[0-9.]/.test(event.key)) {
            event.preventDefault();
        }
        if (event.key === 'Enter') {
            handleDistributedFundChange(event, id);
        }
    };

    const handleAllocateFundClick = () => {
        // if (!isAllowAllocateFund) {
        setTopUpModal(true);
        // }
    };

    const validationSchemaFundAdd = Yup.object().shape({
        distributed_fund: Yup.number()
            .required('Please provide an amount')
            .min(1, 'Amount must be at least $1')
            .max(
                Math.min(totalBalance, 999999),
                `You cannot add more than $${Math.min(totalBalance, 999999)}`
            )
    });

    const emptyWalletHandler = (id: any, available_amount: any) => {
        if (available_amount !== "0.00") {
            dispatch(emptyWalletAmount(id))
        }
    };
    return (
        <>
            <div className='max-w-[100%] overflow-auto pb-20'>
                <div className='table-responsive border-b-[0.5px] rounded-3xl bg-black'>
                    <table {...getTableProps()} className='upcoming_appoinments_table'>
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    <th className='min-w-[300px] max-w-[300px]'>Employee Name</th>
                                    <th>Email Address</th>
                                    <th>Available Balance</th>
                                    <th>Distribute Funds</th>
                                    <th>Action</th>

                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            <>
                                {rows.map((row: Row<IEmployeeListForFundAllocations>, index: number) => {
                                    prepareRow(row);
                                    return (
                                        <>
                                            <tr {...row.getRowProps()}>
                                                <td className=''>
                                                    <div className='flex items-center'>
                                                        <div>
                                                            <div className='w-[42px] min-h-[42px] max-h-[42px]'>
                                                                <Image className='min-h-[42px] max-h-[42px] rounded-md object-cover' src={`${row.original.image}`} alt='table_img' width={100} height={100} />
                                                            </div>
                                                        </div>
                                                        <span className='pl-3'>
                                                            <span className='text-truncate-2 FaExclamationCircle_inline capitalize'>
                                                                {row.original.name ? row.original.name : "--"}
                                                            </span>

                                                            {/* <span className='block userName'>
                                                        {row.original.city}
                                                    </span> */}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className='text-nowrap min-w-[200px] max-w-[200px]'>
                                                    <div className='flex items-center'>
                                                        <span className='px-2 text-[14px] font-medium text_wrap_custome'>
                                                            {row.original.email}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className='text-nowrap min-w-[100px] max-w-[100px]'>
                                                    <div className='flex items-center'>
                                                        <span className='ps-2 pe-2 text-[14px] font-medium text-black capitalize'>
                                                            ${row.original.available_amount}
                                                        </span>
                                                        <div className='ps-5 '>
                                                            {/* <Image src="/images/empty_wallet.png" alt='empty_wallet.png' width={20} height={20}/> */}
                                                            {/* <TbReceiptRefund/> */}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='text-nowrap min-w-[80px] max-w-[90px]'>
                                                    <div className='flex items-center w-100 relative'>
                                                        <input
                                                            className='border p-1 min-w-[80px] max-w-[90px] rounded-lg text-left ps-8'
                                                            value={`${row.original.distributed_fund}`}
                                                            disabled={isChecked}
                                                            maxLength={6}
                                                            onChange={(event) => handleDistributedFundChange(event, row.original.id)} // Pass the index along with the event
                                                            onKeyPress={(event) => handleKeyPress(event, row.id)} // Pass the id along with the event

                                                        />
                                                        <div className='absolute bg-white left-2 border-r pe-2'>
                                                            $
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='min-w-[140px] max-w-[100px]'>
                                                    <div className='flex items-center relative'>
                                                        <button className='btn btn-danger btn'
                                                            onClick={() => { handleAllocateFundClick(); setEmployeeData([row.original]) }}
                                                            onMouseEnter={() => { setShowTooltip(true); setShowTooltipButtonId(row.original.id);}}
                                                            onMouseLeave={() => { setShowTooltip(false); setShowTooltipButtonId(null) }}>
                                                            <FaPlus />
                                                        </button>
                                                        <button
                                                            // disabled={emptyWalletAmountLoader}
                                                            className={`cursor-pointer ${row.original.available_amount == 0 && "disabled not-sr-only"}`}
                                                            onClick={() => {
                                                                    emptyWalletHandler(row.original.id, row.original.available_amount)
                                                            }}
                                                            onMouseEnter={() => { setShowTooltipWallet(true); setShowTooltipButtonId(row.original.id); }}
                                                            onMouseLeave={() => { setShowTooltipWallet(false); setShowTooltipButtonId(null) }}>
                                                            <TbReceiptRefund size={40} color='#FF5402' />
                                                        </button>
                                                        {showTooltipButtonId === row.original.id && showTooltip &&
                                                            <div className="absolute z-10 left-[-75px] top-[10%] w-[64px] h-[36px] bottom-full bg-[#101828] text-white px-2 rounded-[4px]  text-wrap text-[14px] font-medium">
                                                                <span className='flex items-center self-center h-100'>Top up</span>
                                                                <div className='absolute top-0 right-[-10px]'>
                                                                    <Image src={'/images/icons/top_up_shape.svg'} width={20} height={20} alt='top_up_icon' />
                                                                </div>
                                                            </div>
                                                        }
                                                        {showTooltipButtonId === row.original.id && showTooltipWallet &&
                                                            <div className="absolute z-10 left-[-50px] top-[10%] w-[110px] h-[36px] bottom-full bg-[#101828] text-white ps-2 rounded-[4px]  text-wrap text-[14px] font-medium">
                                                                <span className='flex items-center self-center h-100 whitespace-nowrap'>Empty Wallet</span>
                                                                <div className='absolute top-0 right-[-10px]'>
                                                                    <Image src={'/images/icons/top_up_shape.svg'} width={20} height={20} alt='top_up_icon' />
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                </td>
                                            </tr>
                                        </>
                                    );
                                })}
                            </>
                        </tbody>

                    </table>

                </div>
            </div>

            <CenterModal setVisible={setTopUpModal} visible={topUpModal} title='Top Up'>
                <div className='px-5 pt-5 pb-4 '>

                    <div>
                        <Formik
                            enableReinitialize
                            initialValues={{
                                id: employeeData?.[0]?.id || 0,
                                top_up: true,
                                name: '',
                                email: '',
                                available_amount: 0,
                                distributed_fund: 0,

                            }}
                            validationSchema={validationSchemaFundAdd}
                            onSubmit={(values) => {
                                 dispatch(allocateFund([values]));
                                setTopUpModal(false)
                            }}
                        >
                            {(formikProps) => (
                                <Form className="form-input px-0">
                                    <div className="pb-4 px-0">
                                        <div>
                                            <h3 className='font-medium text-black'>Please enter the top up amount:</h3>
                                        </div>
                                        <div className="pt-2">
                                            <input
                                                className='border w-full p-2 mt-2'
                                                id="distributed_fund"
                                                name="distributed_fund"
                                                maxLength={6}
                                                autoFocus={true}
                                                placeholder='Enter top up amount..'
                                                onChange={(e) => formikProps.setFieldValue('distributed_fund', e.target.value)}
                                                onKeyPress={(e) => {
                                                    const regex = /^[0-9]*$/;
                                                    if (!regex.test(e.key)) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            />
                                            <ErrorMessage name="distributed_fund" component="div" className="text-red-500 text-[13px]" />
                                        </div>
                                        <div className="flex pt-5">
                                            <button type="submit" className='btn btn-danger'>
                                                Proceed
                                            </button>
                                            <button type="button" className='btn btn-light text-center block mx-2' onClick={() => setTopUpModal(false)}>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </CenterModal>
        </>
    );
};

export default FundManagementTable;

