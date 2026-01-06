import { useEffect, useState, useRef } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Counter from './components/Counter'
import CountHistory from './components/CountHistory'
import '@fontsource/roboto/400.css'

function App() {
  const [history, setHistory] = useState(localStorage.getItem('counterAppData') ? JSON.parse(localStorage.getItem('counterAppData')).history : [])
  const [count, setCount] = useState(localStorage.getItem('counterAppData') ? JSON.parse(localStorage.getItem('counterAppData')).count : 0)
  const [stepValue, setStepValue] = useState(localStorage.getItem('counterAppData') ? JSON.parse(localStorage.getItem('counterAppData')).stepValue : 1)
  const [saveStatus, setSaveStatus] = useState('idle') // 'idle' | 'saving' | 'saved'

  const saveTimeoutRef = useRef(null)
  const savedClearRef = useRef(null)

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
    localStorage.removeItem('counterAppData')
  }

  // Autosave to localStorage with debounce and abortable saves
  useEffect(() => {
    // clear any pending saved message clearers
    if (savedClearRef.current) {
      clearTimeout(savedClearRef.current)
      savedClearRef.current = null
    }

    // cancel previous pending save
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
      saveTimeoutRef.current = null
    }

    setSaveStatus('saving')
    const token = { aborted: false }

    saveTimeoutRef.current = setTimeout(() => {
      if (token.aborted) return
      const payload = JSON.stringify({ history, count, stepValue })
      localStorage.setItem('counterAppData', payload)
      setSaveStatus('saved')

      // clear "saved" after a short delay
      savedClearRef.current = setTimeout(() => setSaveStatus('idle'), 1500)
    }, 1000)

    // cleanup: abort this token if effect re-runs or component unmounts
    return () => {
      token.aborted = true
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
        saveTimeoutRef.current = null
      }
    }
  }, [history, count, stepValue])

  // cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
      if (savedClearRef.current) clearTimeout(savedClearRef.current)
    }
  }, [])

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
        <h2>{saveStatus === 'saving' ? 'Saving...' : 'Saved!'}</h2>
        <CountHistory history={history} />
      </Container>
    </>
  )
}

export default App
