import { ErrorMessage, Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import Select from 'react-select';
import * as Yup from 'yup';
import { AppState } from '@/redux/types'
import { useDispatch, useSelector } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'
import 'primereact/resources/themes/saga-blue/theme.css'; // Importing PrimeReact theme CSS
import 'primereact/resources/primereact.min.css'; // Importing PrimeReact component CSS
import 'primeicons/primeicons.css'; // Importing PrimeIcons
import { PulseLoader } from 'react-spinners';
import { updateCopmanyProfileData } from '@/redux/actions/comanyUserActions';
import { getCountryList } from '@/redux/actions/userActionTypes';

type Props = {}

const CompanyInformationForm = (props: Props) => {
    const dispatch = useDispatch()
    const userProfile = useSelector((state: AppState) => state.userData.userProfile)
    const isLoading = useSelector((state: AppState) => state.userData.googleLogin)
    const countryList = useSelector((state: AppState) => state.userData.countryList)

    const employeeCount = [
        { value: '0-100', label: '0-100' },
        { value: '100-500', label: '100-500' },
        { value: '500-2000', label: '500-2000' },
        { value: '2000+', label: '2000+' },
        // Add more countries as needed
    ];

    useEffect(() => {
        dispatch(getCountryList())
    }, []);

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
        address: Yup.string().required('City is required'),
        approx_consumer_count: Yup.string().required('Employee count is required'),
        
        country: Yup.string().required('Country is required'),

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
                <h1 className='title'>Company Information</h1>
                <p className='sub_title font-[400]'>Fill blanks with your Company information</p>
            </div>
            <Formik
                enableReinitialize
                initialValues={{
                    approx_consumer_count: userProfile?.approx_consumer_count ? userProfile?.approx_consumer_count : "",
                    available_amount: 0,
                    address: userProfile?.address || "",
                    name: userProfile?.name || '',
                    country: userProfile?.country || null,
                    email: userProfile?.email || '',
                    about: userProfile?.about ? userProfile?.about : "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    dispatch(updateCopmanyProfileData(values));
                }}
            >
                {(formikProps) => (
                    <Form className="form-input">
                      
                         <div className="pb-4">
                            <label htmlFor="fullName">Company Name</label>
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

                        <div className="pb-4">
                            <label htmlFor="gender">Employee Count</label>
                            <Select
                                className=' w-full  mt-2'
                                options={employeeCount}
                                name="approx_consumer_count"
                                styles={customStyles}
                                placeholder={"Select employee count"}
                                value={employeeCount.find((option) => option.value === formikProps?.values?.approx_consumer_count)}
                                onChange={(selectedOption) => formikProps.setFieldValue('approx_consumer_count', selectedOption?.value)}
                                onBlur={formikProps.handleBlur}
                            />
                            <ErrorMessage name="approx_consumer_count" component="div" className="text-red-500 text-[13px]" />
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
                            <label htmlFor="city">City</label>
                            <div className="">
                                <input
                                    className='border w-full p-2 mt-2'
                                    type="text"
                                    id="city"
                                    name="address"
                                    maxLength={100}
                                    placeholder='Enter city'
                                    value={formikProps.values.address}
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
                                    maxLength={50}
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
                                    value={formikProps.values.about}
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

export default CompanyInformationForm