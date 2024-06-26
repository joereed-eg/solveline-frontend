import React, { useEffect, useRef, useState } from 'react'
import { OverlayPanel } from 'primereact/overlaypanel';
import { Router, useRouter } from 'next/router';
import { IoMdClose } from 'react-icons/io';
import { IoSearchOutline } from 'react-icons/io5';
import { IEmployeeData, IEmployeeSearch } from '@/types/companyInterface';
import { emloyeeInvitation, emloyeeInvitationSuccess, getEmloyeeList, resetEmployeeList } from '@/redux/actions/comanyUserActions';
import { useDispatch, useSelector } from 'react-redux';
import CenterModal from '@/modals/CenterModal'
import { ErrorMessage, Form, Formik } from 'formik'
import { AppState } from '@/redux/types';
import { setFormErrors } from '@/redux/actions/userActionTypes'
import * as Yup from 'yup'
import { PulseLoader } from 'react-spinners';
import SearchModal from '../search-modal/SearchModal';


type Props = {
  setSearchQuery: any
  searchQuery: any
}

const EmployeeFilter = (props: Props) => {
  const op = useRef<OverlayPanel>(null);
  const dispatch = useDispatch()
  const router = useRouter()

  const employeeInvitationSuccess = useSelector((state: AppState) => state.company.employeeInvitationSuccess)
  const formEroorData = useSelector((state: AppState) => state.userData.formEroors?.form_errors)
  const employeeInvitationLoader = useSelector((state: AppState) => state.company.employeeInvitationLoader)


  const [employeeInvitationModal, setEmployeeInvitationModal] = useState(false);


  const { searchQuery, setSearchQuery } = props

  const handleSearchClick = (e: any) => {
    if (op.current) {
      op.current?.toggle(e);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchQuery(e.currentTarget.value);
      op.current?.hide(); // Hide OverlayPanel
    }
  };

  const handleApplyClick = () => {
    const searchInput = document.getElementById('searchName') as HTMLInputElement | null; // Explicitly specify the type
    const searchValue = searchInput?.value ?? ''; // Use optional chaining to access value safely
    setSearchQuery(searchValue);
    op.current?.hide(); // Hide OverlayPanel
  };


  useEffect(() => {
    if (router.isReady) {
      let reqObj: IEmployeeData = {
        data: [],
        meta_params: {
          current_page: 0,
          hasMorePage: false,
          last_page: 0,
          nextPage: 0,
          path: '',
          per_page: 0,
          total_count: 0,
        }
      }
      dispatch(resetEmployeeList(reqObj))
    }
    let emloyeeListPaylod: IEmployeeSearch = {
      page: 1,
      search: searchQuery || ''
    }
    dispatch(getEmloyeeList(emloyeeListPaylod))
  }, [searchQuery])


  const employeeInvitationModalShow = () => {
    setEmployeeInvitationModal(true)
  }

  useEffect(() => {
    if (employeeInvitationSuccess) {
      setEmployeeInvitationModal(false)
      dispatch(emloyeeInvitationSuccess(false))
    }
  }, [employeeInvitationSuccess])

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .matches(
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        'Invalid email address'
      )
      .required('Email is required'),
  });

  const errorMessageEmpty = () => {
    dispatch(setFormErrors({
      ...formEroorData,
      form_errors: {
        ...formEroorData,
        email: ''
      }
    }));
  }

  return (
    <div>
      <div className='flex items-center justify-end pb-5'>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5  md:pe-2 relative">
          <>
            <SearchModal searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </>
        </div>
        <div className='text-end md:ms-0 ms-2'>
          <button className='cursor-pointer list text-left btn btn-danger w-auto  btn-danger-shadow' onClick={() => { employeeInvitationModalShow() }}
            style={{ padding: "10px 20px", fontSize: "14px" }}
          >Invite</button>
        </div>
      </div>
      <CenterModal
        setVisible={setEmployeeInvitationModal}
        errorMessageEmpty={errorMessageEmpty}
        visible={employeeInvitationModal}
        title='Invite Employee'
      >
        <div className='pt-6'>
          <Formik
            enableReinitialize
            initialValues={{
              email: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              dispatch(emloyeeInvitation(values));
            }}
          >
            {(formikProps) => (
              <Form className="form-input ">
               
                <div className="pb-4 mb-4">

                  <h3 className='font-medium mt-2'>Email address</h3>
                  <div className="">
                    <input
                      className='border w-full p-2 mt-2 '
                      type="text"
                      id="fullName"
                      name="name"
                      maxLength={50}
                      placeholder='Enter email address'
                      value={formikProps.values.email}
                      onChange={(e) => formikProps.setFieldValue('email', e.target.value)} // Toggle the value
                      onClick={() => dispatch(setFormErrors({ form_errors: { ...formEroorData, email: '' } }))}

                    />

                  </div>
                  <p className='text-red-500 text-[13px]'> {formEroorData?.email && formEroorData?.email}</p>

                  <ErrorMessage name="email" component="div" className="text-red-500 text-[13px]" />
                </div>
                <div className="flex pt-3 border-t">

                  <button
                    type="submit"
                    className='btn btn-danger'
                    disabled={employeeInvitationLoader}
                    onClick={() => errorMessageEmpty()}
                  >
                    {employeeInvitationLoader ? <PulseLoader color="#ffffff" /> : "Send Invite"}
                  </button>

                  <button
                    type="button"
                    className='btn btn-light text-center block mx-2 submit_button'
                    onClick={() => {
                      setEmployeeInvitationModal(false); formikProps.resetForm(); errorMessageEmpty()
                    }}
                  >
                    Cancel
                  </button>
                </div>

              </Form>
            )}
          </Formik>
        </div>

      </CenterModal>
    </div>

  )
}

export default EmployeeFilter