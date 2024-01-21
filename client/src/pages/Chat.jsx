import { Button, useMediaQuery } from "@mui/material"
import React from 'react'
import MobileChat from "../layout/MobileChat";
import DesktopChat from "../layout/DesktopChat";

const Chat = () => {
  const isMobile = useMediaQuery("(max-width:500px)");

  return (
    isMobile ? <MobileChat /> : <DesktopChat />
  )
}

export default Chat