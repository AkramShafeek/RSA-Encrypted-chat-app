import { Alert, Button, Card, Collapse, Divider, Fade, LinearProgress, TextField, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Desktop from '../layout/Desktop';
import Mobile from '../layout/Mobile';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSocket } from '../redux/features/socketSlice';
import { setRoomId } from '../redux/features/roomSlice';
import Username from '../components/Username';
import { useTheme } from '@emotion/react';

export const socket = io("http://192.168.43.215:4000");

const OptionsDivider = () => {
  return (
    <div className="flex gap-4 items-center w-full">
      <Divider sx={{ height: '2px', flex: 1 }} />
      <p className='text-slate-400'>or</p>
      <Divider sx={{ height: '2px', flex: 1 }} />
    </div>
  )
}

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((store) => store.user.username);
  const [showProgress, setShowProgress] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [roomidInput, setroomidInput] = useState("");
  const { palette } = useTheme();

  const onChange = (event) => {
    setroomidInput(event.target.value);
  }

  useEffect(() => {
    socket.on('roomid', (roomid) => {
      console.log("Room id is " + roomid);
      dispatch(setRoomId(roomid));
      navigate('/chat');
    });

    () => {
      socket.off('roomid');
    }
  }, []);

  const createRoom = () => {
    if (!username)
      setError("Please enter your name");
    else
      socket.emit("create room");
  }

  const setError = (msg) => {
    setShowErrorMsg(true);
    setErrorMsg(msg);
    setTimeout(() => {
      setShowErrorMsg(false);
    }, 2000);
  }

  const joinRoom = () => {
    if (!username)
      setError("Please enter your name");
    else if (!roomidInput)
      setError("Room id cannot be empty");
    else {
      dispatch(setRoomId(roomidInput));
      socket.emit("join room", roomidInput);
      navigate("/chat");
    }
  }

  // const isMobile = useMediaQuery("(max-width:500px)");
  return (
    // isMobile ? <Mobile /> : <Desktop />
    <div className="w-full h-full flex flex-col justify-center items-center gap-2">
      <div className='rounded-md p-8 flex flex-col items-center gap-3 shadow-md' style={{ backgroundColor: palette.background.alt }}>
        <div className='w-52 flex flex-col justify-center items-center gap-2'>
          <Username />
        </div>
      </div>
      <div className='rounded-md p-8 flex flex-col items-center gap-3 shadow-md' style={{ backgroundColor: palette.background.alt }}>
        <Fade in={showProgress} sx={{ width: '100%' }} timeout={500}>
          <LinearProgress sx={{ width: "100%", borderRadius: '10px' }} />
        </Fade>
        <div className='w-52 flex flex-col justify-center items-center gap-2'>
          <Button variant='contained' onClick={createRoom} fullWidth disableElevation>Create room</Button>
          {/*--------------------------------------------------------------- */}
          <OptionsDivider />
          {/*--------------------------------------------------------------- */}
          <TextField placeholder="Enter room id" size='small' onChange={onChange}></TextField>
          {/*--------------------------------------------------------------- */}
          <Button variant='contained' onClick={joinRoom} fullWidth disableElevation>Join room</Button>
          {/*--------------------------------------------------------------- */}
          <Collapse in={showErrorMsg} sx={{ width: '100%' }} timeout={500}>
            <Alert color='error' severity='error' sx={{ width: '100%' }}>{errorMsg}</Alert>
          </Collapse>
        </div>
      </div>
    </div>
  )
}

export default Home