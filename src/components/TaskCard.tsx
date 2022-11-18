import React from 'react'
import { Button, Card, CardContent, Checkbox, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { TaskItem } from '../redux/tasks/types'
import { deleteTask, doneTask, updateTask } from '../redux/tasks/asyncActions'
import { useAppDispatch } from '../redux/store'
import { setSelectTask } from '../redux/tasks/slice'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

const TaskCard: React.FC<TaskItem> = props => {
  const { id, title, description, done, targetDate, fileURL } = props
  const dispatch = useAppDispatch()

  const onClickDone = () => {
    dispatch(doneTask({ id, done }))
  }

  const onClickChange = () => {
    dispatch(setSelectTask({ ...props }))
  }

  const onClickDelete = () => {
    dispatch(deleteTask(id))
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant='h5' component='div'>
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {targetDate
            ? `Завершить до ${targetDate}`
            : 'Задача без сроков выполнения'}
        </Typography>
        <Typography variant='body1'>{description}</Typography>
        {fileURL && (
          <Typography variant='body1'>
            <a href={fileURL}>Прикрепленный файл</a>
          </Typography>
        )}
      </CardContent>

      <Checkbox
        {...label}
        onClick={onClickDone}
        checked={done ? true : false}
      />
      <Button
        onClick={onClickDelete}
        variant='outlined'
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
      <Button onClick={onClickChange} variant='contained'>
        Изменить
      </Button>
    </Card>
  )
}

export default TaskCard
