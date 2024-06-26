import { ErrorMessage, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import * as Yup from 'yup';
import { AppState } from '@/redux/types'
import { useDispatch, useSelector } from 'react-redux'
import { getCountryList, setProfileData } from '@/redux/actions/userActionTypes'
import { useRouter } from 'next/router'
import 'react-datepicker/dist/react-datepicker.css'
import moment from "moment";
import 'primereact/resources/themes/saga-blue/theme.css'; // Importing PrimeReact theme CSS
import 'primereact/resources/primereact.min.css'; // Importing PrimeReact component CSS
import 'primeicons/primeicons.css'; // Importing PrimeIcons
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { PulseLoader } from 'react-spinners';

type Props = {}

const PersonalInformationForm = (props: Props) => {
  const dispatch = useDispatch()
  const countryList = useSelector((state: AppState) => state.userData.countryList)
  const userProfile = useSelector((state: AppState) => state.userData.userProfile)
  const isLoading = useSelector((state: AppState) => state.userData.googleLogin)

  useEffect(() => {
    dispatch(getCountryList())
  }, []);

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    // Add more countries as needed
  ];
  const employeeCount = [
    { value: '0-100', label: '0-100' },
    { value: '100-500', label: '100-500' },
    { value: '500-2000', label: '500-2000' },
    { value: '2000+', label: '2000+' },
    // Add more countries as needed
  ];


  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Full name is required')
      .max(50, 'Full name must be at most 50 characters')
      .matches(/^[a-zA-Z ]*$/, 'Please enter a valid name.')
    ,
    email: Yup.string()
      .email('Invalid email address')
      .matches(
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        'Invalid email address'
      )
      .required('Email is required'),
    date_of_birth: Yup.date()
      .nullable()
      .required('Date of birth is required')
      .max(new Date(), 'Date of birth should not be greater than the current date')
      .test('is-valid-date', 'Date of birth should be less than the current date', function (value) {
        // Custom validation function to compare with the current date
        if (value) {
          return new Date(value) <= new Date();
        }
        return true; // Validation passes if the value is null or undefined
      }),
    country: Yup.string().required('Country is required'),
    address: Yup.string().required('City is required'),
    gender: Yup.string().required('Gender is required'),
  });

  const customStyles = {
    option: (provided: any) => ({
      ...provided,
      color: "black",
      backgroundColor: "white",
      borderBottom: "1px solid #E8E8E8E5",
      margingBottom: "0px",
    }),

  };

  return (
    <>
      <div className='pb-5 text-center'>
        <h1 className='title'>Personal Information</h1>
        {/* <h1 className='title'>Company Information</h1> */}
        <p className='sub_title font-[400]'>Fill blanks with your personal information</p>
        {/* <p className='sub_title font-[400]'>Fill blanks with your Company information</p> */}
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          name: userProfile?.name || "",
          email: userProfile?.email,
          date_of_birth: userProfile?.date_of_birth || null,
          country: userProfile?.country || null,
          address: userProfile?.address || "",
          gender: userProfile?.gender || "",
          about: userProfile?.about || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // Format the date of birth before dispatching
          const formattedValues = {
            ...values,
            date_of_birth: values.date_of_birth ? moment(values.date_of_birth).format("YYYY-MM-DD") : null,
          };
          dispatch(setProfileData(formattedValues));
        }}
      >
        {(formikProps) => (
          <Form className="form-input">
            <div className="pb-4">
              <label htmlFor="fullName">Full Name</label>
              <div className="">
                <input
                  className='border w-full p-2 mt-2 '
                  type="text"
                  id="fullName"
                  name="name"
                  maxLength={50}
                  placeholder='Enter full name'
                  value={formikProps.values.name}
                  // Set the custom date template
                  onChange={(e) => formikProps.setFieldValue('name', e.target.value)} // Toggle the value

                />

              </div>
              <ErrorMessage name="name" component="div" className="text-red-500 text-[13px]" />
            </div>
            <div className="pb-4 calendar_icon custom_border hide-border">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <div className={`relative w-100 date_of_birth`}>
                <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale='sk'>
                  <DatePicker
                    className='mt-[25%] text-input error zanur-job-seeker-form_fields_style zanur-input h-12 w-full border-[1px] border-zanur-natural-border'
                    value={formikProps.values.date_of_birth ? moment(formikProps.values.date_of_birth) : null}
                    format="DD/MM/YYYY" // Specify the date format here
                    onChange={(date) => formikProps.setFieldValue('date_of_birth', date ? date.toDate() : null)}
                    maxDate={moment()}
                  />
                </LocalizationProvider>
              </div>
              <ErrorMessage name="date_of_birth" component="div" className="text-red-500 text-[13px]" />
            </div>
            <div className="pb-4">
              <label htmlFor="gender">Gender</label>
              <Select
                className=' w-full  mt-2'
                options={genderOptions}
                isDisabled={userProfile?.profile_status === "complete" ? true : false}
                name="gender"
                styles={customStyles}
                placeholder={"Select gender"}
                value={genderOptions.find((option) => option.value === formikProps?.values?.gender)}
                onChange={(selectedOption) => formikProps.setFieldValue('gender', selectedOption?.value)}
                onBlur={formikProps.handleBlur}
              />
              <ErrorMessage name="gender" component="div" className="text-red-500 text-[13px]" />
            </div>

            <div className="pb-4">
              <label htmlFor="country">Country</label>
              <Select
                className='w-full mt-2'
                options={countryList}
                placeholder={"Select country"}
                name="country"
                styles={customStyles}
                isDisabled={userProfile?.profile_status === "complete" ? true : false}
                value={countryList.find((option) => option.value === formikProps?.values?.country)}
                onChange={(selectedOption) => formikProps.setFieldValue('country', selectedOption?.value)}
                onBlur={formikProps.handleBlur}
              />
              <ErrorMessage name="country" component="div" className="text-red-500 text-[13px]" />
            </div>
            <div className="pb-4">
              <label htmlFor="address">City</label>
              <div className="">
                <input
                  className='border w-full p-2 mt-2'
                  type="text"
                  id="address"
                  name="address"
                  maxLength={100}
                  disabled={userProfile?.profile_status === "complete" ? true : false}
                  placeholder='Enter city'
                  onChange={(e) => formikProps.setFieldValue('address', e.target.value)} // Toggle the value
                />

              </div>
              <ErrorMessage name="address" component="div" className="text-red-500 text-[13px]" />
            </div>
            <div className="pb-4">
              <label htmlFor="email">Email</label>
              <div className="">
                <input
                  disabled={formikProps.values.email ? true : false}
                  className='border w-full p-2 mt-2'
                  type="email"
                  id="email"
                  name="email"
                  value={formikProps.values.email}
                  placeholder='youremail@gmail.com'
                  onChange={(e) => formikProps.setFieldValue('email', e.target.value)} // Toggle the value
                />

              </div>
              <ErrorMessage name="email" component="div" className="text-red-500 text-[13px]" />
            </div>
            <div className="pb-4">
              <label htmlFor="emailId">About You</label>
              <div className="">
                <textarea
                  className='border w-full p-2 mt-2'
                  id="emailId"
                  name="about"
                  maxLength={500}
                  placeholder='Write some information about yourself...'
                  onChange={(e) => formikProps.setFieldValue('about', e.target.value)} // Toggle the value
                />

              </div>
              <ErrorMessage name="about" component="div" className="text-red-500 text-[13px]" />
            </div>

            <div className="mt-3">
              <button
                type="submit"
                disabled={isLoading}
                className='btn btn-danger w-full'
              >
                {isLoading ? <PulseLoader color="#ffffff" /> : "Finish"}
              </button>
            </div>

          </Form>
        )}

      </Formik>
    </>
  )
}

export default PersonalInformationForm