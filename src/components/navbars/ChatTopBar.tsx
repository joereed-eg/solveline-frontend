import React from 'react'

type Props = {
  title:string
}

const ChatTopBar = (props: Props) => {
  return (
    <div className='px-5 py-4'>
       <div className=''>
        <h1 className='title_text_expo font-semibold'>{props?.title}</h1>
       </div>
    </div>
  )
}

export default ChatTopBar