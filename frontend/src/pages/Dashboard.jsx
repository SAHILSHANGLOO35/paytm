import React from 'react'
import Appbar from '../components/Appbar'
import Balance from '../components/Balance'
import Users from '../components/Users'

function Dashboard() {
  return (
    <div>
      <Appbar />
      <div className='ml-4 mr-4'>
        <Balance value="9,999" />
        <Users />
      </div>
    </div>
  )
}

export default Dashboard