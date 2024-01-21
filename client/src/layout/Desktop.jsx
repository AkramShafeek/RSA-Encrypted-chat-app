import { AppBar } from '@mui/material'
import React from 'react'
import Users from '../components/Users'
import ChatArea from '../components/ChatArea'

const Desktop = () => {
  return (
    <div className='w-full h-full bg-gray-100 flex flex-col gap-5 overflow-hidden'>
      <AppBar position='static' className='p-4'>
        Navbar
      </AppBar>

      <div className="flex flex-1 justify-between p-4 box-border gap-5" style={{ "maxHeight": "90%" }}>
        <div className='w-1/4 bg-white rounded-md p-4 box-border'>
          <Users />
        </div>
        <div className='w-3/4 bg-white rounded-md h-full'>
          <ChatArea />
        </div>
      </div>
    </div>
  )
}

export default Desktop