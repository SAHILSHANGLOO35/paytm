import React from 'react'

function Appbar() {
  return (
    <div className='h-14 shadow flex justify-between items-center'>
        <div className='flex flex-col justify-center h-full ml-4 font-semibold'>
            PayTM App
        </div>
        <div className='flex flex-row items-center'>
            <div className='flex flex-col justify-center h-full mr-4 font-semibold'>
                Hello
            </div>
            <div className='rounded-full h-10 w-10 bg-slate-200 flex flex-col justify-center items-center mr-4'>
                <div className='flex flex-col justify-center h-full text-xl'>
                    U
                </div>
            </div>
        </div>
    </div>
  )
}

export default Appbar