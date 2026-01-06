import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

export default function CountHistory({ history = [], onClear }) {
  return (
    <Paper elevation={1} sx={{ mt: 2, p: 2, width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h6">Count History</Typography>
        <Button size="small" onClick={onClear} disabled={history.length === 0}>
          Clear
        </Button>
      </Box>

      {history.length === 0 ? (
        <Typography color="text.secondary">No history yet</Typography>
      ) : (
        <List dense>
          {history.map((h, i) => (
            <ListItem key={i} divider>
              <ListItemText primary={h} />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  )
}
