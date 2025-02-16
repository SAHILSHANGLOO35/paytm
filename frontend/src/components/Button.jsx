import React from 'react'

function Button({ label, onClick }) {
  return (
    <button 
      className='w-96 bg-gray-900 text-white p-3 rounded-md font-medium text-xl mb-4 mt-2 hover:bg-gray-800 transition' 
      onClick={onClick} 
    >
      {label}
    </button>
  )
}

export default Button