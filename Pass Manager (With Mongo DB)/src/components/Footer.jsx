import React from 'react'

const Footer = () => {
    return (
        <div className='bg-blue-200 flex flex-col justify-center items-center w-full py-1'>
            <div className="logo font-bold text-black text-2xl">
                <span className='text-blue-600'>&lt;</span>
                Pass
                <span className='text-blue-600'>Manager/&gt;</span>
            </div>
            <div className='font-medium'>
                Copyright &copy; | All Rights Reserved. | Created by Naman Bhatia.
            </div>
        </div>
    )
}

export default Footer
