import Layout from '@/components/Layout'
import ChatTopBar from '@/components/navbars/ChatTopBar'
import SearchModal from '@/components/search-modal/SearchModal'
import FundManagementTable from '@/components/tables/FundManagementTable'
import CenterModal from '@/modals/CenterModal'
import { addFund, allocateFund, allocateFundSuccess, getEmloyeeListForFundAllocations } from '@/redux/actions/fundManagementActions'
import { AppState } from '@/redux/types'
import { IEmployeeListForFundAllocations } from '@/types/fundManagementInterface'
import { Roles } from '@/types/userInterface'
import { ErrorMessage, Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import 'primereact/resources/themes/saga-blue/theme.css'; // Theme CSS
import 'primereact/resources/primereact.min.css'; // Core CSS
import 'primeicons/primeicons.css'; // Icons CSS
import NoDataGIF from '@/components/loading/NoDataFound'
import { BsExclamationTriangleFill } from "react-icons/bs";
import Image from 'next/image'
import { PulseLoader } from 'react-spinners'
import TopNavbar from '@/components/top-navbar/TopNavbar'
type Props = {}

const FundManagement = (props: Props) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const userProfile = useSelector((state: AppState) => state.userData.userProfile)
  const employeeList = useSelector((state: AppState) => state.fundManagement.employeeListFrofundAllocations)
  const emptyWalletAmountLoader = useSelector((state: AppState) => state.company.emptyWalletAmountLoader)
  const addFundSuccess = useSelector((state: AppState) => state.fundManagement.addFundSuccess)
  const addFundLoader = useSelector((state: AppState) => state.fundManagement.addFundLoader)

  const [confirmDialogModal, setConfirmDialogModal] = useState(false);
  const [funNotAvailable, setFunNotAvailable] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [employeeListData, setEmployeeListData] = useState<IEmployeeListForFundAllocations[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isAllowAllocateFund, setAllowAllocateFund] = useState(false);

  const [allAllocateFund, setAllAllocateFund] = useState<number>(0);

  const [visible, setFunModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);


  useEffect(() => {
    if (router.isReady && userProfile.role !== Roles.COMPANY) {
      router.push('/')
    }
  }, [router.isReady, userProfile.role]);

  useEffect(() => {
    if (router.isReady) {
      dispatch(getEmloyeeListForFundAllocations())
    }
  }, [router.isReady, dispatch]);

  useEffect(() => {
    if (employeeList) {
      setTotalBalance(employeeList.available_amount)
      setEmployeeListData(employeeList.employees)
      const totalDistributedFund = employeeList.employees?.reduce((sum, item) => sum + (item.distributed_fund || 0), 0) || 0;
      // Set the total distributed_fund sum
      setAllAllocateFund(totalDistributedFund);
    }
  }, [employeeList]);


  useEffect(() => {
    if (addFundSuccess) {
      setIsChecked(false);
      setFunModal(false)
    }
  }, [addFundSuccess, dispatch]);

  useEffect(() => {
    const allFundsNonZero = employeeListData.every(employee => employee.distributed_fund == 0);
    setAllowAllocateFund(allFundsNonZero);
  }, [employeeListData]);

  useEffect(() => {
    const filteredData = employeeListData.filter(
      c => c?.name?.toLowerCase().includes(searchQuery.toLowerCase()) || c?.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setEmployeeListData(searchQuery ? filteredData : employeeList.employees);
  }, [searchQuery, employeeList.employees]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      distributeFunds();
    } else {
      setEmployeeListData(employeeList.employees);
      setAllAllocateFund(0);

      const totalDistributedFund = employeeList.employees?.reduce((sum, item) => sum + (item.distributed_fund || 0), 0) || 0;
      setAllAllocateFund(totalDistributedFund);

    }
  };

  const distributeFunds = () => {

    if (!employeeListData.length) return;
    const distributedAmount = Math.floor(totalBalance / employeeListData.length);
    const updatedData = employeeListData.map(item => ({
      ...item,
      distributed_fund: distributedAmount
    }));
    setEmployeeListData(updatedData);

    const totalDistributedFund = updatedData?.reduce((sum, item) => sum + (item.distributed_fund || 0), 0) || 0;
    setAllAllocateFund(totalDistributedFund);

  };

  const allocateFundHandler = () => {
    const totalDistributedFunds = employeeListData?.reduce((sum, employee) => sum + Math.floor(employee.distributed_fund), 0);

    if (totalDistributedFunds > employeeList?.available_amount) {
      setFunNotAvailable(true)
      return;
    }
    if (!isAllowAllocateFund) {
      dispatch(allocateFund(employeeListData));
    }
  };

  const validationSchemaFundAdd = Yup.object().shape({
    amount: Yup.number()
      .required('Please provide an amount')
      .min(1, 'Amount must be at least $1')
      .max(999999, 'You cannot add more than  $999999')
  });

  const handleAllocateFundClick = () => {
    // Check if employeeListData is defined and is an array
    if (!Array.isArray(employeeListData)) {
      console.error('Invalid employee list data');
      return;
    }
    // Calculate the total distributed funds
    const totalDistributedFunds = employeeListData.reduce((sum, employee) => {
      return sum + Math.floor(employee.distributed_fund);
    }, 0);

    // Check if the total distributed funds exceed the available balance
    if (totalDistributedFunds > (employeeList?.available_amount || 0)) {
      setFunNotAvailable(true)
      return;
    }

    // If fund allocation is not allowed, show the modal
    if (!isAllowAllocateFund) {
      // setVisibleModal(true);
      setConfirmDialogModal(true);
    } else {
      // Add logic here to handle the fund allocation when allowed
      console.log('Funds can be allocated. Proceed with allocation logic here.');
    }
  };
  console.log(addFundLoader, "addFundLoaderwe2342")

  return (
    <Layout>
      <TopNavbar />
      <ChatTopBar title="Fund Management" />
      {(addFundLoader || emptyWalletAmountLoader) &&
        <div className='absolute items-center py-20 h-[100%] top-0 w-full left-0 bottom-0 z-10 overlay_loader'>
          <PulseLoader color='#FF5402' />
        </div>
      }
      <div className='md:flex justify-between px-5 items-end  border-t pt-5'>
        <div className='balance_card flex justify-between md:w-3/12'>
          <div>
            <p className='title text-[14px] font-medium text-[#000000]'>Your Balance</p>
            <h2 className='text-[20px] font-semibold'>
              ${totalBalance?.toFixed(2)}
            </h2>
          </div>
          <div>
            <button className='btn btn-danger btn-shadow-danger' onClick={() => setFunModal(true)}>Add</button>
          </div>
        </div>
        <div className=' py-4 md:py-0'>
          <div className='balance_card flex justify-between'>
            <div className='pe-5'>
              <p className='title text-[14px] font-medium text-[#000000]'>Required Balance</p>
              <h2 className='text-[20px] font-semibold'>
                ${allAllocateFund}.00
              </h2>
            </div>
            <div className="pt-2 text-end ">
              <div className="flex items-end">
                <div className="flex items-end h-5 relative pe-2">
                  <input
                    id="termsAndConditions"
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    onMouseEnter={() => { setShowTooltip(true) }}
                    onMouseLeave={() => { setShowTooltip(false) }}
                    className="w-4 h-4 cursor-pointer border border-[#E8E8E8] rounded-lg bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                  {showTooltip &&
                    <div className="absolute z-10 right-[40px] top-[0px] text-wrap text-[14px] font-medium p-1 rounded-md  bg-[#101828] h-[36px] px-3">
                      <span className='flex items-center text-white self-center h-100 whitespace-nowrap'>Distribute funds equally</span>
                      <div className='absolute top-0 right-[-10px]'>
                        <Image src={'/images/icons/top_up_shape.svg'} width={20} height={20} alt='top_up_icon' />
                      </div>
                    </div>
                  }
                </div>
                <button className={`btn btn-danger btn-shadow-danger ${isAllowAllocateFund && "disabled"}`} onClick={handleAllocateFundClick}>Allocate fund</button>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className='px-5 pt-4 mt-4 border-t'>
        <div className='md:w-3/12 relative'>
          <SearchModal searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
      </div>
      <div className='px-5 pt-5'>

        {employeeListData?.length > 0 && (
          <FundManagementTable
            columns={[{ Header: 'Appointment Time', accessor: 'appointmentTime' }]}
            dataList={employeeListData}
            setEmployeeListData={setEmployeeListData}
            setTotalBalance={setTotalBalance}
            totalBalance={totalBalance}
            employeeListData={employeeList}
            setAllAllocateFund={setAllAllocateFund}
            isAllowAllocateFund={isAllowAllocateFund}
            isChecked={isChecked}

          />
        )}

        {employeeListData?.length == 0 &&
          <div className='pt-3'>
            <NoDataGIF loading={true} />
          </div>
        }
      </div>
      <CenterModal setVisible={setFunModal} visible={visible} title='Add Fund'>
        <div className='pb-3 pt-2'>
          <Formik
            enableReinitialize
            initialValues={{ amount: 0 }}
            validationSchema={validationSchemaFundAdd}
            onSubmit={(values) => {
              dispatch(addFund(values));

            }}
          >
            {(formikProps) => (
              <Form className="form-input">
                <div className="pb-4">
                  <div className='pt-2'>
                    <h3 className='font-medium mb-2 text-black'>Please enter the amount you would like to add to your funds:</h3>
                  </div>
                  <div className="pb-3">
                    <input
                      className='border w-full p-2 mt-2'
                      id="amount"
                      name="amount"
                      autoFocus={true}
                      maxLength={6}
                      placeholder='Type here...'
                      onChange={(e) => formikProps.setFieldValue('amount', e.target.value)}
                      onKeyPress={(e) => {
                        const regex = /^[0-9]*$/;
                        if (!regex.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    <ErrorMessage name="amount" component="div" className="text-red-500 text-[13px]" />
                  </div>
                  <div className="flex pt-3">
                    <button type="submit" className='btn btn-danger'>
                      {(addFundLoader || emptyWalletAmountLoader) ? <PulseLoader color="#ffffff" /> : " Proceed payment"}
                    </button>
                    <button type="button" className='btn btn-light text-center block mx-2' onClick={() => setFunModal(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </CenterModal>

      <CenterModal setVisible={setConfirmDialogModal} visible={confirmDialogModal} title='Confirmation'>
        <div className='px-5 pt-5 pb-4 '>
          <div className='flex items-center'>
            <BsExclamationTriangleFill size={30} />
            <p className='ps-3 text-[18px] text-black font-medium'>Are you sure you want to proceed?
            </p>
          </div>
          <div className='border-t mt-10 pt-4 flex'>
            <button
              type="submit"
              className={`btn btn-danger text-center block  submit_button`}
              onClick={() => {
                allocateFundHandler();
                setConfirmDialogModal(false)
              }
              }
            >
              Yes
            </button>
            <button
              type="submit"
              className='btn btn-light text-center block mx-2 submit_button'
              onClick={() => setConfirmDialogModal(false)}
            >
              No
            </button>
          </div>
        </div>
      </CenterModal>

      <CenterModal setVisible={setFunNotAvailable} visible={funNotAvailable} title='Insufficient Balance'>
        <div className='px-5 pt-5 pb-4 text-center'>
          <div className='flex justify-center text-center w-100 pb-3'>
            <BsExclamationTriangleFill size={50} color='#FF5402' />
          </div>
          <div className='flex items-center '>
            <p className='ps-3 text-[18px] text-black font-medium text-center'>Total distributed funds exceed the available balance. Please add more funds.
            </p>
          </div>
          <div className='flex justify-center py-3'>
            <button
              type="submit"
              className='btn btn-danger text-center block mx-2 submit_button'
              onClick={() => setFunNotAvailable(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </CenterModal>

    </Layout>
  )
}

export default FundManagement
