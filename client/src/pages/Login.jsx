import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Login = () => {
  const [isError, setIsError] = useState(false);

  return (
    <div className='flex w-full justify-center h-full items-center'>
      <div className="flex flex-col gap-3">
        <TextField label='username' size='small'/>
        <TextField label='password' type='password' size='small'/>
        <Button variant="contained" disableElevation onClick={() => setIsError(!isError)} className='mt-6'>Login</Button>
        {
          isError &&
          <p className='text-xs text-center p-2 border border-solid border-red-400 rounded-md text-red-400'>
            Invalid username or password
          </p>
        }
        <NavLink to={"/signup"}>
          <p className='text-xs text-center'>Don't have an account? Sign up</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Login