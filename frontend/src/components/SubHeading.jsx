import React from 'react'

function SubHeading({ label }) {
  return (
    <div className='text-slate-500 font-medium pt-1 pb-4 max-w-64 flex text-center'>
      { label }
    </div>
  )
}

export default SubHeading