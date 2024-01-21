import React from 'react'
import ChatArea from '../components/ChatArea'
import { useTheme } from '@emotion/react'

const DesktopChat = () => {
  const { palette } = useTheme();
  return (
    <div className='w-full h-full flex flex-col justify-center items-center gap-3 md:py-20 md:px-64 '>
      <div className="rounded-lg h-full shadow-md w-full" style={{ backgroundColor: palette.background.alt }}>
        <ChatArea />
      </div>
    </div>
  )
}

export default DesktopChat