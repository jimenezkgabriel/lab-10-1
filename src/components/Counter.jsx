import { useState } from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

export default function Counter({ onRecord = () => { } }) {
    const [count, setCount] = useState(0)
    const [stepValue, setStepValue] = useState(1)

    return (
        <Paper elevation={3} sx={{ p: 4, width: '100%', textAlign: 'center' }}>
            <Typography variant="h3" gutterBottom>
                Current Count: {count}
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => { onRecord(count); setCount(c => c - stepValue) }}
                >
                    Decrement
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => { onRecord(count); setCount(c => c + stepValue) }}
                >
                    Increment
                </Button>
            </Box>

            <Box sx={{ mt: 2, display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
                <TextField
                    label="Step Value"
                    type="number"
                    value={stepValue}
                    onChange={(e) => {
                        const val = e.target.value
                        setStepValue(val === '' ? 0 : Number(val))
                    }}
                    sx={{ width: 140 }}
                />
            </Box>
        </Paper>
    )
}
