import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col justify-center text-center items-center py-2 bg-gradient-to-br from-black to-gray-700 bottom-0 w-full'>
        <div className="text-3xl font-bold">
            <span className="text-green-500">&lt;</span>
            <span className='text-white'>Pass</span>
            <span className="text-green-500">OP/&gt;</span>
        </div>
        <div className='flex text-white gap-2 px-4 justify-center items-center'>
            Created by Vinayak Nagar
        </div>
    </div>
  )
}

export default Footer
