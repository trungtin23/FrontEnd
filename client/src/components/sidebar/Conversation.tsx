import React from 'react'

const Conversation = () => {
  return (
    <div className='flex gap-2 items-center p-2  rounded w-72 cursor-pointer '>
      <div className="avatar p-2 w-60 h-16 ">
  <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
  </div>
  <div className='flex flex-col flex-1'>
        <div className='flex gap-3 justify-between' >
            <p className='font-medium text-sm text-black mt-2 ml-3 '>Mai Xuân Thức </p>
        </div>
  </div>
  
</div>
<div className='text-xs   '>
    <time  dateTime="
    
    `">2021-08-26 13:00:00</time>
  </div>
    </div>
  )
}

export default Conversation
