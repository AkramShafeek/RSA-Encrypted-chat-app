import React, { useEffect, useState } from 'react'
import Message from './Message'
import { Button, Icon, IconButton, Switch, TextField, useTheme } from '@mui/material'
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../pages/Home';
import { clearRoomState, setOtherUser, unsetOherUser } from '../redux/features/roomSlice';
import { encryptText } from '../rsa/encryption';
import { getPrivateKey, getPublicKey } from '../rsa/generateKey';
import { decryptText } from '../rsa/decryption';

const ChatArea = () => {
  const [publicKey, setPublicKey] = useState([]);
  const [privateKey, setPrivateKey] = useState([]);
  const [sendResponse, setSendResponse] = useState(false);
  const [messages, setMessages] = useState([]);
  const [checked, setChecked] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const roomid = useSelector((store) => store.room.roomId);
  const otherUser = useSelector((store) => store.room.otherUser);
  const username = useSelector((store) => store.user.username);
  const { palette } = useTheme();

  useEffect(() => {
    setPublicKey(getPublicKey());
    setPrivateKey(getPrivateKey());

    socket.emit("join room", roomid);
    socket.emit("syn username", roomid, username);

    socket.on("syn username", (otherUser) => {
      dispatch(setOtherUser(otherUser));
      socket.emit("ack username", roomid, username);
    });

    socket.on("ack username", (otherUser) => {
      dispatch(setOtherUser(otherUser));
    });

    socket.on("fin username", () => {
      dispatch(unsetOherUser());
    })

    // cleanup the listeners
    return () => {
      socket.off("syn username");
      socket.off("ack username");
      socket.off("off username");
      socket.emit("fin username", roomid);
      socket.emit("leave room", roomid);
      dispatch(unsetOherUser());
    }
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log("Message received " + message);
      console.log(message.message);
      const receivedText = checked ? decryptText(message['message'], privateKey) : message['message'];
      setMessages([{ alignLeft: true, message: receivedText }, ...messages]);
    });

    return () => {
      socket.off("message");
    }
  })

  const handleClick = () => {
    if (text == "")
      return;

    
    const textToBeSent = checked ? encryptText(text, publicKey) : text;

    socket.emit("message", roomid, { alignLeft: true, message: textToBeSent });
    setMessages([{ alignLeft: false, message: text }, ...messages]);

    setText("");
  }

  useEffect(() => {
    if (sendResponse) {
      console.log("Sending response");
      const currMessage = [{ alignLeft: true, message: "Hello! How are you?" }, ...messages];
      setMessages(currMessage);
    }
  }, [sendResponse]);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <div className='w-full h-full flex flex-col justify-between box-border rounded-lg' style={{ backgroundColor: palette.background.alt }}>
      <div className="w-full pl-5 pr-5 pt-5 flex gap-4 items-center">
        <Switch onChange={(event) => setChecked(event.target.checked)} checked={checked}></Switch>
        <p className='text-sm font-bold text-gray-500'>Encryption</p>
      </div>
      <div className='w-full p-5 border-b-2 box-border flex justify-between' style={{ borderBottomColor: palette.neutral.light }}>
        <p className='text-sm md:text-lg font-bold' style={{ color: palette.primary.main }}>{otherUser ? otherUser : `Waiting for other user to join...`}</p>
        <p className='text-sm md:text-lg font-bold' style={{ color: palette.primary.main }}>{`Room id: ${roomid}`}</p>
      </div>
      <div className='h-full p-5 overflow-y-scroll box-border flex flex-col-reverse gap-3' style={{ backgroundColor: palette.background.alt }}>
        {messages.map((sampleMessage, index) => (
          <div className={`flex w-full ${sampleMessage.alignLeft ? "justify-start" : "justify-end"}`} key={index}>
            <Message
              message={sampleMessage.message}
              bgcolor={sampleMessage.alignLeft ? palette.neutral.light : palette.primary.main}
              textColor={sampleMessage.alignLeft ? palette.neutral.dark : "#FFFFFF"} />
          </div>
        ))}
      </div>
      <div className='w-full p-4 border-t-2 box-border flex items-center gap-2' style={{ borderTopColor: palette.neutral.light }}>
        <TextField
          size='small'
          fullWidth
          onChange={(event) => setText(event.target.value)}
          placeholder='Enter message'
          InputProps={{
            sx: {
              borderRadius: '25px',
              backgroundColor: palette.neutral.light,
              border: 'none',
              outline: 'none',
              '&:hover': {
                border: 'none',
                outline: 'none'
              }
            },
          }} onKeyDown={(event) => { if (event.key === "Enter") handleClick(); }} value={text}></TextField>
        <IconButton sx={{
          height: "100%",
          aspectRatio: "1/1"
        }} color='primary' onClick={handleClick} >
          <SendRoundedIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default ChatArea