import React from 'react'
import Users from '../components/Users'
import { AppBar } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Mobile = () => {
  const navigate = useNavigate();
  return (
    <div className='w-full h-full bg-gray-100 flex flex-col overflow-hidden'>
      <AppBar position='static' className='p-4'>
        Navbar
      </AppBar>

      <div className='w-full h-full overflow-y-scroll p-5 box-border'>
        <div className="p-2 bg-white h-full rounded-md shadow-sm">
          <Users callback={() => setTimeout(() => navigate("/chat"), 400)} />
        </div>
      </div>
    </div>
  )
}

export default Mobile