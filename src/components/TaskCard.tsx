import React from 'react'
import { Button, Card, CardContent, Checkbox, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { TaskItem } from '../redux/tasks/types'
import TasksAPI from '../API/TasksAPI'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

const TaskCard: React.FC<TaskItem> = ({ id, title, description }) => {
  const deleteTask = () => {
    TasksAPI.deleteTask(id)
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant='h5' component='div'>
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          Finish before
        </Typography>
        <Typography variant='body1'>{description}</Typography>
      </CardContent>

      <Checkbox {...label} defaultChecked />
      <Button
        onClick={deleteTask}
        variant='outlined'
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
      <Button variant='contained'>Изменить</Button>
    </Card>
  )
}

export default TaskCard
