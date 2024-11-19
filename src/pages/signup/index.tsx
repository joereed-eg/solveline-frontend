import { ErrorMessage, Form, Formik } from 'formik'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { setFormErrors, userSignup, userSignupSuccess } from '@/redux/actions/userActionTypes'
import GoogleSigninButton from '@/components/google-login/GoogleSigninButton'
import { AppState } from '@/redux/types'
import { PulseLoader } from 'react-spinners'
import { useRouter } from 'next/router'
import LoginBanner from '@/components/login-right-banner/LoginBanner';
import { IFormErrors, Roles } from '@/types/userInterface';

type Props = {}

const SignUp = (props: Props) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const isLoading = useSelector((state: AppState) => state.userData.userSignUpLoading)
    const formEroorData = useSelector((state: AppState) => state.userData.formEroors?.form_errors)
    const userProfile = useSelector((state: AppState) => state.userData.userProfile)
    const googleLogin = useSelector((state: AppState) => state.userData.googleLogin)
    // const userEmail = useSelector((state: AppState) => state.userData.userEmail)
    const isSignupSuccess = useSelector((state: AppState) => state.userData.signupSuccess)
    const isUserInvited = useSelector((state: AppState) => state.userData.isUserInvited)
    // const userRole = useSelector((state: AppState) => state.userData.userRole)

    const [isShowPassword, setShowPassword] = useState(true)
    const [showConfirmPassword, setShowConfirmPassword] = useState(true)


    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address')
            .matches(
                /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                'Invalid email address'
            )
            .required('Email address is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters long and include at least 1 digit, 1 uppercase, and 1 lowercase character.')
            .max(20, 'Password must not exceed 20 characters')
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
                'Password must be at least 8 characters long and include at least 1 digit, 1 uppercase, and 1 lowercase character.'
            )
            .required('Password is required'),
        confirm_password: Yup.string()
            .oneOf([Yup.ref('password'), ""], 'Passwords must match')
            .required('Confirm password is required'),
        termsAndConditions: Yup.boolean()
            .oneOf([true], 'You must accept the terms and conditions'),

    });

    useEffect(() => {
        if (userProfile?.isAuth && userProfile.profile_status === "complete") {
            router.push('/')
        }
    }, [userProfile?.isAuth])


    useEffect(() => {
        if (router.isReady) {
            dispatch(setFormErrors({ form_errors: { ...formEroorData, email: '' } }))
        }
    }, [router])

    useEffect(() => {
        if (isSignupSuccess) {
            if (userProfile.profile_status === "incomplete") {
                router.push("/personalinformation")
                dispatch(userSignupSuccess(false))
            } else {
                router.push("/")
                dispatch(userSignupSuccess(false))
            }
        }
    }, [isSignupSuccess])



    return (
        <>
            {googleLogin &&
                <div className='absolute items-center py-20 h-[100%] top-0 w-full left-0 bottom-0 z-10 overlay_loader'>
                    <PulseLoader color='#FF5402' />
                </div>
            }
            <div className="relative flex flex-wrap  bg-white ">
                <div className={`relative w-full w-custom-536 md:w-1/2 p-8 md:overflow-hidden items-center md:h-100 `}>
                    <div className='flex justify-between items-center'>
                        <Link href={"/login"} className=''>
                            <Image src={"/images/logo.png"} alt="login img" width={120} height={59} />
                        </Link>

                    </div>
                    <div className={`items-center sign-form flex ${isUserInvited ? "company_signup_form_height" : "h-100"}`}>
                        <div className='w-full pb-4 small-view md:mx-7'>
                            <h1 className='title'>Sign Up</h1>
                            <p className='sub_title font-[400]'>Enter your details below to create your account</p>
                            {!isUserInvited &&
                                <>
                                    <div className='md:pt-8 pt-4'>
                                        <GoogleSigninButton signup_source="signup" />
                                    </div>

                                    <div className='py-8'>
                                        <div className='relative'>
                                            <div className='border-custome'>
                                                <span className='line_info'>
                                                    <span className='bg-white px-5'>or</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }

                            <Formik
                                // enableReinitialize
                                initialValues={{
                                    email: userProfile?.email ?? "",
                                    password: "",
                                    confirm_password: "",
                                    // role: "consumer",
                                    termsAndConditions: false,
                                }}
                                validateOnChange={true}// Disable validation on field change
                                validateOnBlur={true} // Disable validation on field blur

                                validationSchema={validationSchema}
                                onSubmit={(values) => {
                                    dispatch(userSignup(values))
                                }}
                            >
                                {(formikProps) => (
                                    <Form className="form-input">

                                        <div className="pb-4">
                                            <label htmlFor="email">Email address</label>
                                            <div className="">
                                                <input
                                                    className='border w-full p-2 mt-2'
                                                    type="text"
                                                    id="email"
                                                    disabled={isUserInvited}
                                                    name="email"
                                                    value={formikProps?.values?.email}
                                                    maxLength={50}
                                                    placeholder='Enter email address'
                                                    onChange={(e) => formikProps.setFieldValue('email', e.target.value)} // Toggle the value
                                                    onClick={() => dispatch(setFormErrors({ form_errors: { ...formEroorData, email: '' } }))}

                                                />

                                            </div>
                                           <p className='text-red-500 text-[13px]'> {formEroorData?.email && formEroorData?.email}</p>
                                            <ErrorMessage name="email" component="div" className="text-red-500 text-[13px]" />
                                        </div>
                                        <div className="pb-4">
                                            <label htmlFor="password">Password</label>
                                            <div className="relative">
                                                <input
                                                    className='border w-full p-2 mt-2'
                                                    type={isShowPassword ? "password" : "text"}
                                                    id="password"
                                                    name="password"
                                                    maxLength={20}
                                                    placeholder='Enter password'
                                                    onChange={(e) => formikProps.setFieldValue('password', e.target.value)} // Toggle the value
                                                />
                                                <span className="absolute inset-y-0 end-0 grid w-10 place-content-center top-2 cursor-pointer">
                                                    {!isShowPassword ?
                                                        <Image onClick={() => setShowPassword(true)} src={"/images/icons/hidePassword.png"} alt='showPassword.png' width={18} height={12} />
                                                        :
                                                        <Image onClick={() => setShowPassword(false)} src={"/images/icons/showPassword.png"} alt='showPassword.png' width={18} height={12} />
                                                    }
                                                </span>

                                            </div>
                                            <ErrorMessage name="password" component="div" className="text-red-500 text-[13px]" />
                                        </div>
                                        <div className="pb-4">
                                            <label htmlFor="password">Confirm Password</label>
                                            <div className="relative">
                                                <input
                                                    className='border w-full p-2 mt-2'
                                                    type={showConfirmPassword ? "password" : "text"}
                                                    id="password"
                                                    name="confirm_password"
                                                    maxLength={20}
                                                    placeholder='Enter confirm password'
                                                    onChange={(e) => formikProps.setFieldValue('confirm_password', e.target.value)} // Toggle the value
                                                />
                                                <span className="absolute inset-y-0 end-0 grid w-10 place-content-center top-2 cursor-pointer">
                                                    {!showConfirmPassword ?
                                                        <Image onClick={() => setShowConfirmPassword(true)} src={"/images/icons/hidePassword.png"} alt='showPassword.png' width={18} height={12} />
                                                        :
                                                        <Image onClick={() => setShowConfirmPassword(false)} src={"/images/icons/showPassword.png"} alt='showPassword.png' width={18} height={12} />
                                                    }
                                                </span>

                                            </div>
                                            <ErrorMessage name="confirm_password" component="div" className="text-red-500 text-[13px]" />
                                        </div>
                                        <div className="md:flex items-center justify-between md:pb-0 pb-3 md:pt-5 pt-2 ">
                                            <div className="flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input
                                                        id="termsAndConditions"
                                                        type="checkbox"
                                                        name="termsAndConditions"
                                                        onChange={(e) => formikProps.setFieldValue('termsAndConditions', e.target.checked)}
                                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                        style={{padding:"10px"}}
                                                        />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label htmlFor="termsAndConditions" className="text-gray-500 dark:text-gray-300">I agree to the <a target='_blank' href="https://www.exponentgroup.org/terms-of-use" className='text-balck font-bold'>Terms and Conditions</a> </label>
                                                </div>

                                            </div>
                                            {/* <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a> */}
                                        </div>
                                        <ErrorMessage name="termsAndConditions" component="div" className="text-red-500 text-[13px]" />
                                        <div className="mt-3">
                                            <button
                                                type="submit"
                                                className='btn btn-danger w-full flex justify-center items-center'
                                                disabled={isLoading}

                                            >
                                                {isLoading ? <PulseLoader color="#ffffff" />
                                                    : "Sign Up"}

                                            </button>
                                        </div>
                                        <div className='mt-5 text-[14px] font-[400] text-center'>
                                            <span className='text-[#282C32] '> Already have an account?</span> <Link href={"/login"} className='text-[#000000]'>Login</Link>
                                        </div>
                                    </Form>
                                )}

                            </Formik>
                        </div>
                    </div>
                </div>
                <div className="w-full w-custom-904 md:w-1/2 login_baner md:block hidden">
                    <LoginBanner />
                </div>
            </div>

        </>
    )
}

export default SignUp