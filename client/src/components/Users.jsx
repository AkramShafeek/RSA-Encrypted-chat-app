import { ListItem, ListItemButton, ListItemText, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { selectChat } from '../redux/features/chatSlice';
import { useDispatch, useSelector } from "react-redux";

const Users = ({ callback }) => {
  const selectedUser = useSelector((store) => store.chat.selectedChat);
  const sample = [1, 2, 3, 4, 5, 6, 7];
  const dispatch = useDispatch();
  const { palette } = useTheme();

  return (
    <div className='w-full h-full overflow-y-scroll'>
      {
        sample.map((item, index) => (
          <ListItem key={index}>
            <ListItemButton sx={{
              borderRadius: '5px',
              backgroundColor: item === selectedUser ? palette.primary.light : "transparent",
              color: item === selectedUser ? "white" : "black",
              '&:hover': {
                backgroundColor: item === selectedUser ? palette.primary.light : palette.grey[50]
              }
            }} onClick={() => { setTimeout(() => dispatch(selectChat(item)), 400); if (callback) callback(); }} >
              <Typography fontWeight="meduim" >
                {`User ${item}`}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))
      }
    </div>
  )
}

export default Users