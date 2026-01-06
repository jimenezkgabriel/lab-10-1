import { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Counter from './components/Counter'
import CountHistory from './components/CountHistory'
import '@fontsource/roboto/400.css' 

function App() {
  const [history, setHistory] = useState([])

  const handleRecord = (prev) => setHistory(h => [prev, ...h])

  return (
    <>
      <CssBaseline />

      <Container
        maxWidth="sm"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          py: 4,
        }}
      >
        <Typography variant="h4" component="h1">
          Counter App
        </Typography>

        <Counter onRecord={handleRecord} />
        <CountHistory history={history} onClear={() => setHistory([])} />
      </Container>
    </>
  )
} 

export default App
