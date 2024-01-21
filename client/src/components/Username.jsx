import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUsername } from '../redux/features/userSlice';

// timeout variable for debouncing
let timeout;

const Username = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState();

  const onChange = (event) => {
    setName(event.target.value);

    // debouncing
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch(setUsername(event.target.value));
    }, 500);
  }

  return (
    <TextField placeholder="Enter your name" size='small' onChange={onChange}></TextField>
  )
}

export default Username