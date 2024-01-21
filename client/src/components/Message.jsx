import { useTheme } from '@emotion/react'
import React from 'react'

const Message = ({ message, bgcolor, textColor }) => {
  const { palette } = useTheme();

  return (
    <div className='rounded-lg p-2 pl-4 pr-4' style={{ color: textColor, backgroundColor: bgcolor, maxWidth: "80%", wordWrap: "break-word" }}>
      <p>{message}</p>
    </div>
  )
}

export default Message