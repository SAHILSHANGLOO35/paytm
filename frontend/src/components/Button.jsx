import React from 'react'

function Button({ label }) {
  return (
    <div className='cursor-pointer w-96 bg-gray-900 flex items-center justify-center p-3 text-white rounded-md font-medium text-xl mb-4 mt-2'>
      { label }
    </div>
  )
}

export default Button