import Layout from '@/components/Layout'
import ChatTopBar from '@/components/navbars/ChatTopBar'
import { addProfileImage, deleteProfileImage, getCountryList, getPaymentHistory, getProfileData, resetPaymentData, setProfileData } from '@/redux/actions/userActionTypes'
import { AppState } from '@/redux/types'
import { ErrorMessage, Form, Formik } from 'formik'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css'
import { FadeLoader, PulseLoader } from 'react-spinners'
import { Calendar } from 'primereact/calendar'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import PaymentHistoryTable from '@/components/tables/PaymentHistoryTable'
import NoDataGIF from '@/components/loading/NoDataFound'
import Select from 'react-select';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'
import TopNavbar from '@/components/top-navbar/TopNavbar'
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Roles } from '@/types/userInterface'
import UpdateCompanyProfile from '@/components/forms/UpdateCompanyProfile'
type Props = {}


const columns = [
    { Header: 'Appointment Time', accessor: 'appointmentTime' },
];


const Profile = (props: Props) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const userProfile = useSelector((state: AppState) => state.userData.userProfile)
    const editProfileLoader = useSelector((state: AppState) => state.userData.editProfileLoader)
    const isLoading = useSelector((state: AppState) => state.userData.userSignUpLoading)
    const countryList = useSelector((state: AppState) => state.userData.countryList)
    const paymentHistoryData = useSelector((state: AppState) => state.userData.paymentHistoryData)
    const appointmentListLoader = useSelector((state: AppState) => state.appointmentData.appointmentListLoader)
    const rescheduleAppontmentLoader = useSelector((state: AppState) => state.appointmentData.rescheduleAppontmentLoader)
    const isAuth = useSelector((state: AppState) => state.userData.userProfile.isAuth)

    const [profileTab, setProfileTab] = useState('profile')
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
        address: Yup.string().required('City is required'),
        gender: Yup.string().required('Gender is required'),
        // about: Yup.string()
        //     .required('About is required')
        //     .max(500, 'Exceeds maximum character limit'),
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
    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
        // Add more countries as needed
    ];
    useEffect(() => {
        dispatch(getCountryList())
    }, []);


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            // Check if file size is greater than 2MB
            if (file.size > 10 * 1024 * 1024) {
                // File size exceeds 2MB, handle accordingly
                toast.error("Image size should be less than 10MB", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                event.target.value = "";
            } else {
                // Check if file type is PNG, JPG, or JPEG
                const fileType = file.type.split('/')[1]; // Extracting file extension
                if (fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg') {
                    // File type is allowed, dispatch the image
                    dispatch(addProfileImage(file));
                } else {
                    // File type is not allowed, show error message
                    toast.error("Only PNG, JPG, or JPEG images are allowed", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    event.target.value = "";
                }
            }
        }
    };


    useEffect(() => {
        if (userProfile.role === Roles.CONSUMER) {
            if (router.isReady) {
                dispatch(resetPaymentData([]))
                setTimeout(() => {
                    let reqObj = {
                        page: 1,
                    }
                    // if(isAuth){
                    dispatch(getPaymentHistory(reqObj));
                    // }
                }, 1000);
            }
        }

    }, [router])
    
    useEffect(() => {
        if (router.isReady) {
            dispatch(getProfileData());
        }
    }, [router]);

    return (
        <Layout>
            <TopNavbar />
            <ChatTopBar title="Profile" />
            <div className='profile_tab '>
                <div className='flex px-5'>
                    <div className={`tab_item pb-4 font-medium ${profileTab === "profile" ? "active" : 'text-[#666666]'} `}>
                        <p className='cursor-pointer' onClick={() => setProfileTab("profile")}>My profile</p>
                    </div>
                    {userProfile.role === Roles.CONSUMER &&
                        <div className={`ms-10 tab_item font-medium ${profileTab === "paymentInfo" ? "active" : "text-[#666666]"}`}>
                            <p className='cursor-pointer' onClick={() => setProfileTab("paymentInfo")}>Payment information</p>
                        </div>
                    }
                </div>
            </div>
            <div className='tab_content px-5 py-8'>
                {profileTab === "profile" &&
                    <>
                        <div className='md:flex justify-between'>


                            <div className='profile_img flex items-center'>
                                <input type="file" id="upload" className='hidden' onChange={handleImageChange} />
                                <label htmlFor="upload">
                                    <div>
                                        {editProfileLoader ?
                                            <>
                                                <FadeLoader color="#CB333B" />
                                            </>
                                            :
                                            <>
                                                {userProfile?.image &&
                                                    <Image src={userProfile?.image} width={50} height={50} className="rounded-full max-w-[60px] min-h-[60px] max-h-[60px] min-w-[60px] object-cover" alt='user_img' />
                                                }</>

                                        }

                                    </div>
                                </label>
                                <div className='ps-3 relative'>
                                    <span className='pe-3 cursor-pointer' onClick={() => dispatch(deleteProfileImage())}>Delete</span>
                                    <input type="file" id="upload" className='hidden' onChange={handleImageChange} />
                                    <label htmlFor="upload">
                                        <span className='border-l-2 ps-3 cursor-pointer' >Update</span>
                                    </label>
                                </div>
                            </div>
                            {userProfile.parent_user_id !== null &&
                                <div className='md:pt-0 pt-5'>
                                    <div className='balance_card  justify-between '>
                                        <div className='flex items-center justify-between'>
                                            <p className='title text-[16px] font-medium text-black'>Your Balance :</p>
                                            <h2 className='text-[20px] font-semibold ps-6'>
                                                {userProfile?.wallet_amount}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        {userProfile.role === Roles.CONSUMER ?
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    name: userProfile?.name || '',
                                    email: userProfile?.email || '',
                                    date_of_birth: userProfile?.date_of_birth ? new Date(userProfile.date_of_birth) : null,
                                    country: userProfile?.country ? userProfile?.country : null,
                                    address: userProfile?.address ? userProfile?.address : "",
                                    gender: userProfile?.gender ? userProfile?.gender : "",
                                    about: userProfile?.about ? userProfile?.about : "",
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values) => {
                                    const formattedValues = {
                                        ...values,
                                        isProfile: true,
                                        date_of_birth: values.date_of_birth ? moment(values.date_of_birth).format("YYYY-MM-DD") : null,
                                    };
                                    dispatch(setProfileData(formattedValues))
                                }}
                            >
                                {(formikProps) => (
                                    <Form className="form-input profile_form">
                                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 pt-5'>
                                            <div className="pb-4">
                                                <label htmlFor="fullName">Full name</label>
                                                <div className="">
                                                    <input
                                                        className='border w-full p-2 mt-2'
                                                        type="text"
                                                        id="fullName"
                                                        name="name"
                                                        value={formikProps.values.name}
                                                        maxLength={50}
                                                        placeholder='Your full name'
                                                        onChange={(e) => formikProps.setFieldValue('name', e.target.value)}
                                                    />
                                                </div>
                                                <ErrorMessage name="name" component="div" className="text-red-500 text-[13px]" />
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
                                                        onChange={(e) => formikProps.setFieldValue('email', e.target.value)}
                                                    />
                                                </div>
                                                <ErrorMessage name="email" component="div" className="text-red-500 text-[13px]" />
                                            </div>
                                            <div className="pb-4 calendar_icon">
                                                <label htmlFor="dateOfBirth">Date of birth</label>
                                                <div className="relative w-100 date_of_birth hide-border">
                                                    <div className='pt-2 custom_border'>
                                                        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale='sk'>
                                                            <DatePicker
                                                                className='pt-3 text-input h-12 w-full border-[1px]'
                                                                value={formikProps.values.date_of_birth ? moment(formikProps.values.date_of_birth) : null}
                                                                format="DD/MM/YYYY"
                                                                onChange={(date) => formikProps.setFieldValue('date_of_birth', date ? date.toDate() : null)}
                                                                maxDate={moment()}

                                                            />
                                                        </LocalizationProvider>
                                                    </div>
                                                </div>
                                                <ErrorMessage name="date_of_birth" component="div" className="text-red-500 text-[13px]" />
                                            </div>
                                            <div className="pb-4">
                                                <label htmlFor="gender">Gender</label>
                                                <Select
                                                    isDisabled
                                                    className=' w-full  mt-2'
                                                    options={genderOptions}
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
                                                    isDisabled
                                                    className='w-full mt-2'
                                                    options={countryList}
                                                    placeholder={"Select country"}
                                                    name="country"
                                                    styles={customStyles}
                                                    value={countryList.find((option) => option.value === formikProps?.values?.country)}
                                                    onChange={(selected) => formikProps.setFieldValue('country', selected?.value)}
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
                                                        value={formikProps.values.address}
                                                        id="address"
                                                        name="address"
                                                        maxLength={100}
                                                        disabled
                                                        placeholder='Enter city'
                                                        onChange={(e) => formikProps.setFieldValue('address', e.target.value)} // Toggle the value
                                                    />

                                                </div>
                                                <ErrorMessage name="address" component="div" className="text-red-500 text-[13px]" />
                                            </div>
                                            <div className="pb-4">
                                                <label htmlFor="emailId">About You</label>
                                                <div className="">
                                                    <textarea
                                                        className='border w-full p-2 mt-2'
                                                        id="emailId"
                                                        name="about"
                                                        value={formikProps.values.about}
                                                        maxLength={500}
                                                        placeholder='Write some information about yourself...'
                                                        onChange={(e) => formikProps.setFieldValue('about', e.target.value)} // Toggle the value
                                                    />

                                                </div>
                                                <ErrorMessage name="about" component="div" className="text-red-500 text-[13px]" />
                                            </div>

                                        </div>
                                        <div className="mt-3">
                                            <button
                                                type="submit"
                                                className='btn btn-danger'
                                                disabled={isLoading}
                                            >
                                                {isLoading ? <PulseLoader color="#ffffff" /> : "Save"}
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                            :
                            <UpdateCompanyProfile />
                        }
                    </>
                }
                {profileTab === "paymentInfo" &&
                    <>
                        <div className='pb-6'>
                            <h1 className='section_title text-black md:pb-0 pb-3'>Payment history</h1>
                        </div>
                        {paymentHistoryData?.length > 0 &&
                            <PaymentHistoryTable columns={columns} dataList={paymentHistoryData} />
                        }
                        {paymentHistoryData?.length === 0 && !rescheduleAppontmentLoader && !appointmentListLoader &&
                            <div className='pt-3'>
                                <NoDataGIF loading={true} />
                            </div>
                        }
                    </>

                }
            </div>
        </Layout>
    )
}

export default Profile
