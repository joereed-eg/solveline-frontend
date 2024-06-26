import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { userGoogleLogin } from '@/redux/actions/userActionTypes';

const GoogleSigninButton = ({ signup_source }) => {
    const dispatch = useDispatch();

    const [googleTokenResponse, setGoogleTokenResponse] = useState({});


    const googleLogin = useGoogleLogin({
        onSuccess: credentialResponse => setGoogleTokenResponse(credentialResponse),
    });


 

    useEffect(() => {
        if(googleTokenResponse?.access_token){
            const payload = {
                type:'google',
                signup_source: signup_source,
                data:{
                    access_token:googleTokenResponse?.access_token
                }
            }
          
            dispatch(userGoogleLogin(payload));
        }
    }, [googleTokenResponse])

    return (
        <button
            onClick={() => googleLogin()}
            className={`${false && "opacity-40"} cursor-pointer flex rounded-md w-full  items-center p-3 bg-backgroundGrey-500 mr-2 dark:bg-borderColor-600 btn-light btn justify-center btn btn-light-shadow `}>
                 <Image src={"/images/icons/google_icon.svg"} width={24} height={24} alt='google_icon.svg' />
            <p className="xl:text-body lg:text-sm  pl-3 text-[#282C32]">Continue with Google</p>
        </button>
    )
}
export default GoogleSigninButton
 