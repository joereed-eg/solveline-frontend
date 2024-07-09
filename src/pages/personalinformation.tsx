 import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LoginBanner from '../components/login-right-banner/LoginBanner'
import { AppState } from '@/redux/types'
import { useSelector } from 'react-redux'
 import 'react-datepicker/dist/react-datepicker.css'
 import 'primereact/resources/themes/saga-blue/theme.css'; // Importing PrimeReact theme CSS
import 'primereact/resources/primereact.min.css'; // Importing PrimeReact component CSS
import 'primeicons/primeicons.css'; // Importing PrimeIcons
import PersonalInformationForm from '@/components/forms/PersonalInformationForm'
import { Roles } from '@/types/userInterface'
import CompanyInformationForm from '@/components/forms/CompanyInformationForm'

type Props = {}

const PersonalInformation = (props: Props) => {
  
     const userProfile = useSelector((state: AppState) => state.userData.userProfile)


    return (
        <>
            <div className="relative flex flex-wrap  bg-white">
                <div className="relative w-full w-custom-536 md:w-1/2 p-8 ">
                    <div className='flex justify-between items-center'>
                        <Link href={"/"} className=''>
                            <Image src={"/images/logo.png"} alt="login img" width={115} height={50} />
                        </Link>

                    </div>
                    <div className='pt-14 items-center md:mx-6 sign-form flex'>
                        <div className='w-full pb-4 small-view'>
                            {userProfile?.role === Roles.COMPANY  ?
                              <CompanyInformationForm/>
                              :
                              <PersonalInformationForm/>
                            }
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

export default PersonalInformation