import { ErrorMessage, Form, Formik } from 'formik'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
 import { forgotPasswordStageOne, sendOtp, setFormErrors } from '@/redux/actions/userActionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@/redux/types';
import { IFormErrors } from '@/types/userInterface';
import { useRouter } from 'next/router';
import { PulseLoader } from 'react-spinners';
import LoginBanner from '@/components/login-right-banner/LoginBanner';


type Props = {}

const ForgotPassword = (props: Props) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const formEroorData = useSelector((state: AppState) => state.userData.formEroors?.form_errors)
    const formEroors = useSelector((state: AppState) => state.userData.formEroors)
    const sendOtpLoader = useSelector((state: AppState) => state.userData.sendOtpLoader)

    const validationSchema = Yup.object().shape({
        email: Yup.string()
        .email('Invalid email address')
        .matches(
            /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
            'Invalid email address'
        )
        .required('Email is required'),});
     
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
            <div className="relative flex flex-wrap  bg-white">
                <div className="relative w-full  w-custom-536 md:w-1/2 p-8">
                    <div className='flex justify-between items-center'>
                        <Link href={"/"} className=''>
                            <Image src={"/images/logo.png"} alt="login img" width={120} height={59} />
                        </Link>
                        
                    </div>
                    <div className='login-form-height items-center md:mx-6 sign-form flex'>
                        <div className='w-full'>
                            <h1 className='title'>Forgot password?</h1>
                            <p className='sub_title font-[400] pb-8 pt-3'>We will be sending you an One-Time Password (OTP) on your registered email to reset your password.</p>
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    stage:"1",
                                    email: "",
                                }}
                              
                                validationSchema={validationSchema}
                                onSubmit={(values) => {
                                    dispatch(forgotPasswordStageOne(values))
                                }}
                            >
                                {({ values, setFieldValue }) => (
                                    <Form className="form-input">

                                        <div className="pb-4">
                                            <label htmlFor="email">Email address</label>
                                            <div className="">
                                                <input
                                                    className='border w-full p-2 mt-2'
                                                    type="text"
                                                    id="email"
                                                    name="email"
                                                    maxLength={50}
                                                    placeholder='Enter email address'
                                                    onChange={(e) => setFieldValue('email', e.target.value)} // Toggle the value
                                                    onClick={() => dispatch(setFormErrors({ form_errors: { ...formEroorData, email: '' } }))}

                                                />

                                            </div>
                                            <p className='text-red-500 text-[13px]'> {formEroorData?.email && formEroorData?.email}</p>
                                            <p className='text-red-500 text-[13px]'> {formEroors?.message && formEroors?.message }</p>
                                            <ErrorMessage name="email" component="div" className="text-[#FF5402] pl-2 pt-2 text-[14px]" />
                                        </div>

                                        <div className="mt-3 sm:flex">
                                            <Link
                                                href={"/login"}
                                                className='btn btn-light sm:w-1/2 w-full mr-2 d-inline-md sm:mb-0 mb-3 text-center block'
                                            >
                                                Back
                                            </Link>
                                            <button
                                                type="submit"
                                                className='btn btn-danger sm:w-1/2 w-full d-inline-md block text-center'
                                            >
                                             
                                                {sendOtpLoader ? <PulseLoader color="#ffffff" /> : "Send OTP"}
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
                <div className="w-full  w-custom-904 md:w-1/2 login_baner md:block hidden">
                    <LoginBanner />
                </div>
            </div>

        </>
    )
}

export default ForgotPassword