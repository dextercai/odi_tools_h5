import { useState } from 'react'
import ResponsiveAppBar from './comp/ResponsiveAppBar'
import './App.css'
import { Box, Container } from '@mui/system';

import MacPasswd from './pageContent/macPasswd';

function App() {
  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
        <Container>
          <Box py={5}>
            <MacPasswd></MacPasswd>
          </Box>
        </Container>
    </>
  )
}

export default App
