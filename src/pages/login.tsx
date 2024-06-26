import { ErrorMessage, Form, Formik } from 'formik'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import LoginBanner from '../components/login-right-banner/LoginBanner'
import * as Yup from 'yup';
import { setFormErrors, userLogin } from '@/redux/actions/userActionTypes'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '@/redux/types'
import { useRouter } from 'next/router'
import { PulseLoader } from 'react-spinners'
import { IFormErrors } from '@/types/userInterface'
import GoogleSigninButton from '@/components/google-login/GoogleSigninButton'


type Props = {}

const Login = (props: Props) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const isLoading = useSelector((state: AppState) => state.userData.userSignUpLoading)
    const googleLogin = useSelector((state: AppState) => state.userData.googleLogin)
    const formEroorData = useSelector((state: AppState) => state.userData.formEroors?.form_errors)
    const formEroorDataMessage = useSelector((state: AppState) => state.userData.formEroors)

    const [isShowPassword, setShowPassword] = useState(true)



    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address')
            .matches(
                /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                'Invalid email address'
            )
            .required('Email is required'),
        password: Yup.string()
            .min(4, 'Password must be at least 4 characters')
            .required('Password is required'),

    });


    useEffect(() => {
        if (router.isReady) {
            let payloadEmpty: IFormErrors = {
                form_errors: {
                    email: "",
                    password: "",
                },
                message: "",
            }
            dispatch(setFormErrors(payloadEmpty))
        }
    }, [router])


    return (
        <>
        {googleLogin && 
         <div className='absolute items-center py-20 h-[100%] top-0 w-full left-0 bottom-0 z-10 overlay_loader'>
         <PulseLoader color='#CB333B' />
       </div>
        }
            <div className="relative flex flex-wrap  bg-white">
                <div className="relative w-full w-custom-536 md:w-1/2 p-8 md:overflow-hidden">
                    <div className='flex justify-between items-center'>
                        <Link href={"/"} className=''>
                            <Image src={"/images/logo.png"} alt="login img" width={103} height={59} />
                        </Link>
                        {/* <div>
                            <Link href={"/"} className='text-[14px] flex'>
                                <Image src={"/images/icons/provider_icon.svg"} alt='provider_icon.svg' className='mr-2' width={20} height={20} />
                                Sign Up as a provider</Link>
                        </div> */}

                    </div>
                    <div className='login-form-height items-center md:mx-6 sign-form flex md:pt-10'>

                        <div className='w-full md:pt-2 pb-4 small-view'>
                            <h1 className='title'>Welcome back to Exponent Group!</h1>
                            <p className='sub_title font-[400]'>Log in to explore a world of guidance and support.</p>

                            <div className='md:pt-8 pt-4'>

                                <GoogleSigninButton  signup_source="login" />
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
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    email: "",
                                    password: "",
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values) => {
                                    dispatch(userLogin(values))
                                }}
                            >
                                {({ values, setFieldValue }) => (
                                    <Form className="form-input">

                                        <div className="pb-4">
                                            <label htmlFor="emailId">Email address</label>
                                            <div className="">
                                                <input
                                                    className='border w-full p-2 mt-2'
                                                    type="text"
                                                    id="emailId"
                                                    name="email"
                                                    maxLength={50}
                                                    placeholder='Enter email address'
                                                    onChange={(e) => setFieldValue('email', e.target.value)} // Toggle the value
                                                    // onClick={() => dispatch(setFormErrors({ form_errors: { ...formEroorData, email: '' } }))}
                                                    onClick={() => dispatch(setFormErrors({ ...formEroorData, message: '' }))}
                                                />

                                            </div>
                                            <p className='text-red-500 text-[13px]'> {formEroorDataMessage?.message && formEroorDataMessage?.message}</p>
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
                                                    maxLength={30}
                                                    placeholder='Enter password'
                                                    onChange={(e) => setFieldValue('password', e.target.value)} // Toggle the value
                                                    onClick={() => dispatch(setFormErrors({ form_errors: { ...formEroorData, password: '' } }))}
                                                />
                                                <span className="absolute inset-y-0 end-0 grid w-10 place-content-center top-2 cursor-pointer">
                                                    {!isShowPassword ?
                                                        <Image onClick={() => setShowPassword(true)} src={"/images/icons/hidePassword.png"} alt='showPassword.png' width={18} height={12} />
                                                        :
                                                        <Image onClick={() => setShowPassword(false)} src={"/images/icons/showPassword.png"} alt='showPassword.png' width={18} height={12} />
                                                    }
                                                </span>

                                            </div>
                                            <p className='text-red-500 text-[13px]'> {formEroorData?.password && formEroorData?.password}</p>
                                            <ErrorMessage name="password" component="div" className="text-red-500 text-[13px]" />
                                        </div>
                                        <div className="flex items-center justify-end pb-5">
                                            <Link href="/forgot-password" className="text-sm font-medium text-[#CB333B] hover:underline ">Forgot password?</Link>
                                        </div>
                                        <div className="mt-3">
                                            <button
                                                type="submit"
                                                className='btn btn-danger w-full'
                                                disabled={isLoading}
                                            >
                                                {isLoading ? <PulseLoader color="#ffffff" /> : "Login"}
                                            </button>
                                        </div>
                                        <div className='mt-5 text-[14px] font-[400] text-center'>
                                            <span className='text-[#282C32] '> Don’t have an account?</span> <Link href={"/signup"} className='text-[#000000]'>Sign Up</Link>
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

export default Login