import { ErrorMessage, Form, Formik } from 'formik'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import * as Yup from 'yup';
import { AppState } from '@/redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordStageThree, setFormErrors } from '@/redux/actions/userActionTypes';
import { PulseLoader } from 'react-spinners';
import LoginBanner from '@/components/login-right-banner/LoginBanner';


type Props = {}

const NewPassword = (props: Props) => {
    const dispatch = useDispatch()
    const userVerifyToken = useSelector((state: AppState) => state.userData.userVerifyToken)
    const formEroorData = useSelector((state: AppState) => state.userData.formEroors?.form_errors)
    const verifyEmailLoader = useSelector((state: AppState) => state.userData.verifyEmailLoader)
    const userEmail = useSelector((state: AppState) => state.userData.userEmail)

    const [showCreatePassword, setShowCreatePassword] = useState(true)
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters long and include at least 1 digit, 1 uppercase, and 1 lowercase character.')
            .required('Password is required'),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref('password'), ""], 'Passwords must match')
            .required('Confirm password is required'),

    });
    return (
        <>
            <div className="relative flex flex-wrap  bg-white ">
                <div className="relative w-full  w-custom-536 md:w-1/2 p-8">
                    <div className='flex justify-between items-center'>
                        <Link href={"/"} className=''>
                            <Image src={"/images/logo.png"} alt="login img" width={120} height={59} />
                        </Link>

                    </div>
                     <div className='md:pt-24 pt-16 items-center md:mx-6 sign-form flex'>
                        <div className='w-full'>
                            <h1 className='title'>New Password</h1>
                            <p className='sub_title font-[400] pb-8 pt-3'>Let’s create new password for your account!</p>
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    stage: "3",
                                    email: userEmail?.toLocaleLowerCase(),
                                    verify_token: userVerifyToken,
                                    password: "",
                                    password_confirmation: "",

                                }}

                                validationSchema={validationSchema}
                                onSubmit={(values) => {
                                    dispatch(forgotPasswordStageThree(values))
                                }}
                            >
                                {({ values, setFieldValue }) => (
                                    <Form className="form-input">
                                        <div className="pb-4">
                                            <label htmlFor="password">Create Password</label>
                                            <div className="relative">
                                                <input
                                                    className='border w-full p-2 mt-2'
                                                    type={showCreatePassword ? "password" : "text"}
                                                    id="password"
                                                    name="password"
                                                    placeholder='Enter password'
                                                    onChange={(e) => setFieldValue('password', e.target.value)} // Toggle the value
                                                    onClick={() => dispatch(setFormErrors({ form_errors: { ...formEroorData, email: '' } }))}
                                                />
                                                <span className="absolute inset-y-0 end-0 grid w-10 place-content-center top-2 cursor-pointer">
                                                    {!showCreatePassword ?
                                                        <Image onClick={() => setShowCreatePassword(true)} src={"/images/icons/hidePassword.png"} alt='showPassword.png' width={18} height={12} />
                                                        :
                                                        <Image onClick={() => setShowCreatePassword(false)} src={"/images/icons/showPassword.png"} alt='showPassword.png' width={18} height={12} />
                                                    }
                                                </span>

                                            </div>
                                            <p className='text-red-500 text-[13px]'> {formEroorData?.email && formEroorData?.email}</p>
                                            <ErrorMessage name="password" component="div" className="text-red-500 ps-2" />
                                        </div>
                                        <div className="pb-4">
                                            <label htmlFor="password">Confirm Password</label>
                                            <div className="relative">
                                                <input
                                                    className='border w-full p-2 mt-2'
                                                    type={showConfirmPassword ? "password" : "text"}
                                                    id="password"
                                                    placeholder='Enter confirm password'
                                                    name="password_confirmation"
                                                    onChange={(e) => setFieldValue('password_confirmation', e.target.value)} // Toggle the value
                                                />
                                                <span className="absolute inset-y-0 end-0 grid w-10 place-content-center top-2 cursor-pointer">
                                                    {!showConfirmPassword ?
                                                        <Image onClick={() => setShowConfirmPassword(true)} src={"/images/icons/hidePassword.png"} alt='showPassword.png' width={18} height={12} />
                                                        :
                                                        <Image onClick={() => setShowConfirmPassword(false)} src={"/images/icons/showPassword.png"} alt='showPassword.png' width={18} height={12} />
                                                    }
                                                </span>

                                            </div>
                                            <ErrorMessage name="password_confirmation" component="div" className="text-red-500 ps-2" />
                                        </div>

                                        <div className="mt-3 sm:flex">
                                            <Link
                                                href={"/forgot-password-verifyemail"}
                                                className='btn btn-light sm:w-1/2 w-full mr-2 d-inline-md sm:mb-0 mb-3 text-center block'
                                            >
                                                Back
                                            </Link>
                                            <button
                                                disabled={verifyEmailLoader}
                                                type="submit"
                                                className='btn btn-danger sm:w-1/2 w-full d-inline-md block text-center'
                                            >

                                                {verifyEmailLoader ? <PulseLoader color="#ffffff" /> : "Confirm Password"}

                                            </button>
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

export default NewPassword