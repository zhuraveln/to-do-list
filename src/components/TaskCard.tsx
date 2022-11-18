import React from 'react'
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Link,
  Stack,
  Typography
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { TaskItem } from '../redux/tasks/types'
import { deleteTask, doneTask } from '../redux/tasks/asyncActions'
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
    <Stack mb={1.5}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Stack spacing={1.5}>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
            >
              <Checkbox
                {...label}
                onClick={onClickDone}
                checked={done ? true : false}
              />
              <Typography variant='h5' component='div'>
                {title}
              </Typography>
              <Stack direction='row' spacing={0.5}>
                <Button onClick={onClickChange} variant='contained'>
                  Изменить
                </Button>
                <Button onClick={onClickDelete} variant='outlined'>
                  <DeleteIcon />
                </Button>
              </Stack>
            </Stack>

            <Typography variant='body1'>{description}</Typography>
            {fileURL && (
              <Stack direction='row' spacing={0.3}>
                <AttachFileIcon />
                <Typography variant='body1'>
                  <Link href={fileURL} target='_blank'>
                    <b>Прикрепленный файл</b>
                  </Link>
                </Typography>
              </Stack>
            )}
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              {targetDate ? (
                <p>
                  <b>Завершить до:</b> {targetDate}
                </p>
              ) : (
                'Задача без сроков выполнения'
              )}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}

export default TaskCard
