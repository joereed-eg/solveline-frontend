import React from 'react'

const Wrapper = ({children, className}) => {
  return (
    <div className={`w-full max-w-[1280px] px-5 md:px-10 lg:px-8 xl:px-5 mx-auto`}>
        {children}
    </div>
  )
}

export default Wrapper