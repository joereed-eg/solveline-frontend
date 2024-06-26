import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';
import { useTable, Row } from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@/redux/types';
import { PulseLoader } from 'react-spinners';
import { useInView } from 'react-intersection-observer'
import { IUserProfile } from '@/types/userInterface';
import { IEmployeeData, IEmployeeSearch } from '@/types/companyInterface';
import { InputSwitch } from "primereact/inputswitch";
import { getEmloyeeList, updateEmployeeStatus } from '@/redux/actions/comanyUserActions';
import { useRouter } from 'next/router';
import { FaCalendarDays } from "react-icons/fa6";
import { LuEye } from "react-icons/lu";
import CenterModal from '@/modals/CenterModal';
import moment from 'moment';
import SearchModal from '../search-modal/SearchModal';


type Props = {
    columns: any;
    dataList: IEmployeeData;
    searchQuery?: any;
    welcomePage?: boolean;
}

const EmployeeTable = (props: Props) => {
    const dispatch = useDispatch()
  const setSearchQuery = "20"
    const initiaEmployeeListParams = useMemo(
        () => ({
            page: 1,
        }),
        []
    );
    const appointmentListLoader = useSelector((state: AppState) => state.appointmentData.appointmentListLoader)
    //   const [switchStates, setSwitchStates] = useState<{ [key: number]: boolean }>({});

    const { ref, inView } = useInView({
        threshold: 0,
        initialInView: false
    }
    );
    const { columns, dataList, searchQuery } = props;

    const [employeesLength, setEmployeesLength] = useState(0);
    const [pageRequested, setPageRequested] = useState(0);
    const [employeeListParams, setEmployeeListParams] = useState(initiaEmployeeListParams);
    const [scrollValue, setScrollValue] = useState<boolean>(false);
    const [visible, setVisible] = useState(false);
    const [emloyeeDetails, setEmloyeeDetails] = useState<IUserProfile>();



    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: dataList?.data
    });


    useEffect(() => {
        setEmployeesLength(dataList?.data?.length);
    }, [dataList]);

    useEffect(() => {
         if (
            inView === true &&
            employeesLength < dataList?.meta_params.total_count &&
            dataList?.meta_params?.hasMorePage === true &&
            Number(pageRequested) !== Number(dataList?.meta_params?.nextPage)
            // inView === true &&
            // employeesLength < dataList?.meta_params.total_count &&
            // dataList?.meta_params?.hasMorePage === true
        ) {
            setEmployeeListParams((candidateParams) => {

                return { ...candidateParams, page: dataList?.meta_params.nextPage };
            });
            setScrollValue(true);
        }
    }, [inView, dataList?.meta_params.total_count, dataList?.meta_params?.hasMorePage]);


    useEffect(() => {
        if (
            scrollValue === true &&
            // Number(pageRequested) !== Number(dataList?.meta_params.nextPage) &&
            // dataList?.meta_params?.hasMorePage === true
            dataList?.meta_params?.hasMorePage === true
        ) {
            setPageRequested(dataList?.meta_params.nextPage);
            let emloyeeListPaylod: IEmployeeSearch = {
                page: employeeListParams.page,
                search: searchQuery
            }
            dispatch(getEmloyeeList(emloyeeListPaylod))
            // }

            setScrollValue(false);
        } else if (pageRequested === undefined) {
            setPageRequested(1);
        }
    }, [dataList?.meta_params?.hasMorePage, employeeListParams.page, dispatch,
        pageRequested, scrollValue]);


    const handleSwitchChange = (rowId: number, checked: boolean) => {
         dispatch(updateEmployeeStatus(rowId))
    };


    useEffect(() => {
        setPageRequested(1)
    }, [searchQuery])

    const viewEmployeeHandler = (data: any) => {
        setVisible(true)
        setEmloyeeDetails(data)
    }
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
                                    <th>Gender</th>
                                    <th>DOB</th>
                                    <th>Status</th>

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
                                {rows.map((row: Row<IUserProfile>, index: number) => {
                                    prepareRow(row);
                                    let isLast = false;
                                    if (index + 1 === employeesLength) {
                                        isLast = true;
                                    }
                                    return (
                                        <>
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
                                                            <span className='px-2 text-[14px] font-medium'>
                                                                {row.original.email}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className='text-nowrap min-w-[150px] max-w-[150px]'>
                                                        <div className='flex items-center'>
                                                            <span className='ps-2 text-[14px] font-medium text-black capitalize'>
                                                                {row.original.gender ? row.original.gender : "--"}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className='text-nowrap min-w-[120px] max-w-[120px]'>
                                                        <div className='flex items-center'>
                                                            {row.original.date_of_birth &&
                                                                <div>
                                                                    <FaCalendarDays size={16} />
                                                                </div>
                                                            }
                                                            <span className='ps-2 text-[14px] font-medium text-black'>
                                                                {row.original.date_of_birth ?
                                                                    <>
                                                                        {moment(row.original.date_of_birth, "DD-MM-YYYY").format("DD/MM/YYYY")}
                                                                    </>
                                                                    :
                                                                    <>
                                                                        --
                                                                    </>
                                                                }
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className='text-nowrap min-w-[140px] max-w-[100px]'>
                                                        <div className='flex items-center'>
                                                            <InputSwitch
                                                                checked={row.original.status === "active"}
                                                                onChange={(e) => handleSwitchChange(Number(row.original.id), e.value)}
                                                            />
                                                            <div className='ps-3 cursor-pointer' onClick={() => { viewEmployeeHandler(row.original) }}>
                                                                <LuEye size={25} />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </>

                                            {isLast === true && <div className="" ref={ref}></div>}</>

                                    );
                                })}
                            </>
                        </tbody>

                    </table>

                </div>
            </div>

            <CenterModal
                setVisible={setVisible}
                visible={visible}
                title='Employee Details'
            >

                <div className='pb-3 pt-2 px-5'>
                    <div className='py-2'>
                        <div className='md:flex block'>
                            <span className='md:w-4/12 w-full font-medium text-black'>Name </span>
                            <span className=' md:ps-3 md:inline block text-truncate-2  md:w-8/12 w-full d-flex capitalize'><span className="md:inline-block hidden pe-1"> : </span> {emloyeeDetails?.name} </span>
                        </div>
                    </div>
                    <div className='py-2'>
                        <div className='md:flex block'>
                            <span className='md:w-4/12 w-full font-medium text-black'>Received Amount</span>
                            <span className=' md:ps-3 md:inline block text-truncate-2 md:w-8/12 w-full d-flex'><span className="md:inline-block hidden pe-1"> : </span>{emloyeeDetails?.total_received_amount} </span>
                        </div>
                    </div>
                    <div className='py-2'>
                        <div className='md:flex block'>
                            <span className='md:w-4/12 w-full font-medium text-black'>Available Amount  </span>
                            <span className=' md:ps-3 md:inline block md:w-8/12 w-full d-flex'><span className="md:inline-block hidden pe-1"> : </span>{emloyeeDetails?.available_amount}</span>
                        </div>
                    </div>
                </div>



            </CenterModal>
        </>
    );
};

export default EmployeeTable;
