import { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Counter from './components/Counter'
import CountHistory from './components/CountHistory'
import '@fontsource/roboto/400.css'

function App() {
  const [history, setHistory] = useState([])
  const [count, setCount] = useState(0)
  const [stepValue, setStepValue] = useState(1)

  const handleIncrement = () => {
    const next = count + stepValue
    setCount(next)
    setHistory(prevHistory => [next, ...prevHistory])
  }

  const handleDecrement = () => {
    const next = count - stepValue
    setCount(next)
    setHistory(prevHistory => [next, ...prevHistory])
  }

  const handleStepChange = (val) => setStepValue(val)

  const handleReset = () => {
    setHistory([])
    setCount(0)
    setStepValue(1)
  }

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

        <Counter
          count={count}
          stepValue={stepValue}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onStepChange={handleStepChange}
          onReset={handleReset}
        />

        <CountHistory history={history} />
      </Container>
    </>
  )
}

export default App
