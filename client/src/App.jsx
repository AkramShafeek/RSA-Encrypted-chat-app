import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Login from './pages/Login'
import Chat from './pages/Chat'
import { themeSettings } from '../theme'
import { useMemo } from 'react'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

function App() {
  const theme = useMemo(() => createTheme(themeSettings['purple']("dark")));
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
