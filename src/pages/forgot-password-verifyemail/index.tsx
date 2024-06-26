


import { ErrorMessage, Form, Formik } from 'formik'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import OtpInput from "react-otp-input";
import * as Yup from 'yup';
 import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@/redux/types';
import { forgotPasswordStageTwo, sendOtp, setFormErrors, verifyEmail } from '@/redux/actions/userActionTypes';
import { useRouter } from 'next/router';
import { IFormErrors, IResendOtp } from '@/types/userInterface';
import { PulseLoader } from 'react-spinners';
import LoginBanner from '@/components/login-right-banner/LoginBanner';


type Props = {}

const ForgotPasswordVerifyEmail = (props: Props) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const formEroorData = useSelector((state: AppState) => state.userData.formEroors)
     const userEmail = useSelector((state: AppState) => state.userData.userEmail)
    const verifyEmailLoader = useSelector((state: AppState) => state.userData.verifyEmailLoader)


    const [canResend, setCanResend] = useState(true);
    const [isClicked, setIsClicked] = useState(false);
    const [timer, setTimer] = useState(10);
    const formatTimer = (time: number) => {
        return time < 10 ? `0${time}` : time;
    };
    const resendOtpHandler = () => {
        if (canResend) {
            setIsClicked(true);
            let resendOtp: IResendOtp = {
                email: userEmail
            };
            dispatch(sendOtp(resendOtp));
            setCanResend(false);
            setTimeout(() => {
                setCanResend(true);
                setIsClicked(false);
            }, 10000);
            startTimer(); // Start the timer
        }
    };

    const startTimer = () => {
        let seconds = 10;
        const timerInterval = setInterval(() => {
            seconds--;
            setTimer(seconds);
            if (seconds === 0) {
                clearInterval(timerInterval);
            }
        }, 1000);
    };

    useEffect(() => {
        if (timer === 0) {
            setTimer(10); // Reset the timer once it reaches 0
        }
    }, [timer]);

    const validationSchema = Yup.object().shape({
        otp: Yup.string()
            .trim()
            .required('OTP is required')
            .matches(/^\d{6}$/, 'OTP must be exactly 6 digits'),
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
            <div className="relative flex flex-wrap  bg-white ">
                <div className="relative w-full  w-custom-536 md:w-1/2 p-8">
                    <div className='flex justify-between items-center'>
                        <Link href={"/"} className=''>
                            <Image src={"/images/logo.png"} alt="login img" width={120} height={59} />
                        </Link>
                    </div>
                    <div className='login-form-height items-center md:mx-6 sign-form flex'>
                        <div className='w-full '>
                            <h1 className='title'>Check your email</h1>
                            <p className='sub_title font-[400] pb-8 pt-3'>We have sent OTP number to <span className='text-black font-medium'>{userEmail ?? ""} </span>
                                Please confirm the number</p>
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    stage: "2",
                                    otp: '',
                                    email: userEmail
                                }}
                                validationSchema={validationSchema}
                                validateOnBlur={true}
                                validateOnChange={true}
                                onSubmit={(values) => {
                                    dispatch(forgotPasswordStageTwo(values))
                                }}
                            >
                                {(formikProps) => (
                                    <Form className="form-input">

                                        <div className=" otp_input relative">
                                            <OtpInput
                                                value={formikProps.values.otp}
                                                onChange={(event) => {
                                                    formikProps.setFieldValue("otp", event); // Update the form field value
                                                }}
                                                numInputs={6}


                                                renderInput={(props, index) => (<>
                                                    <input
                                                        {...props}
                                                        style={{
                                                            ...props.style,
                                                            borderColor: formikProps.values.otp[index] ? "#FF5402" : "#E0E0E0",
                                                        }}
                                                        onKeyPress={(e) => {
                                                            // Allow only numerical digits
                                                            if (!/^\d$/.test(e.key) && e.key !== 'Backspace') {
                                                                e.preventDefault();
                                                            } else {
                                                            }
                                                            dispatch(setFormErrors({
                                                                ...formEroorData,
                                                                form_errors: {
                                                                  ...formEroorData.form_errors,
                                                                  email: ''
                                                                }
                                                              }));
                                                        }}
                                                        onKeyDown={(e) => {
                                                            dispatch(setFormErrors({
                                                                ...formEroorData,
                                                                form_errors: {
                                                                  ...formEroorData.form_errors,
                                                                  email: ''
                                                                }
                                                              })); 
                                                        }}

                                                    />
                                                    <span className='absolute end-0 bottom-[-25px] text-[#FF5402] cursor-pointer' onClick={() => resendOtpHandler()}>
                                                        {isClicked ?
                                                            <p>00:{formatTimer(timer)}</p>
                                                            :
                                                            "Resend OTP"
                                                        }
                                                    </span>
                                                </>
                                                )}
                                            />
                                        </div>

                                        <p className='text-red-500 text-[13px]'> {formEroorData?.form_errors?.email && formEroorData?.form_errors?.email}</p>
                                        {formEroorData?.form_errors?.email ?
                                            <></>
                                            :
                                            <ErrorMessage name="otp" component="div" className='text-red-500 text-[13px]' />
                                        }

                                        <div className="mt-3 sm:flex pt-8">
                                            <Link
                                                href={"/forgot-password"}
                                                className='btn btn-light sm:w-1/2 w-full mr-2 d-inline-md sm:mb-0 mb-3 text-center block'
                                            >
                                                Back
                                            </Link>

                                            <button
                                                type="submit"
                                                disabled={verifyEmailLoader}
                                                className='btn btn-danger sm:w-1/2 w-full d-inline-md text-center block'
                                            >
                                                {verifyEmailLoader ? <PulseLoader color="#ffffff" /> : "Confirm OTP"}
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

export default ForgotPasswordVerifyEmail