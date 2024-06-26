import Image from 'next/image'
import React from 'react'

type Props = {}

const LoginBanner = (props: Props) => {
    return (
        <>
            <div className='relative h-full object-cover'>
                <Image src={"/images/login.png"} alt="login img" className="login_img " width={904} height={900} />
                <div className='banner_info'>
                    <p >Experience the power of Exponent Group – whether you're seeking guidance or ready to share your expertise as a provider. Sign up today and unlock a world of possibilities</p>
                </div>
            </div>
        </>
    )
}

export default LoginBanner