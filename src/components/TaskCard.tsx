import React from 'react'
import dayjs from 'dayjs'

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

import { deleteTask, doneTask } from '../redux/tasks/asyncActions'
import { useAppDispatch } from '../redux/store'
import { setSelectTask } from '../redux/tasks/slice'

import { TaskItem } from '../redux/tasks/types'

/**
 * React функциональный компонент "Карточка задачи"
 * @params {props} объект типа TaskItem
 */
const TaskCard: React.FC<TaskItem> = props => {
  /** Деструктуризация полученных данных из props */
  const { id, title, description, done, targetDate, fileURL } = props

  /** Инициализация dispatch для работы с Redux */
  const dispatch = useAppDispatch()

  /** Функция обработчик события клика на <Checkbox/> */
  const onClickDone = () => {
    dispatch(doneTask({ id, done }))
  }

  /** Функция обработчик события клика на кнопку Изменить */
  /** Уставаливает в state 'selectTask' выбранную задачу */
  const onClickChange = () => {
    dispatch(setSelectTask({ ...props }))
  }

  /** Функция обработчик события клика на кнопку Удалить */
  const onClickDelete = () => {
    dispatch(deleteTask(id))
  }

  /** Определение "просроченности" выполнения задачи */
  const timeIsOver = dayjs().isAfter(dayjs(targetDate, 'DD/MM/YYYY H:mm'))

  return (
    /** Карточка задачи */
    <Card
      sx={{
        marginBottom: '10px',
        background: `${done ? '#ddffdd' : timeIsOver ? '#ffb3b3' : '#fffabb'}`
      }}
    >
      <CardContent>
        <Stack spacing={1.5}>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            {/* Checkbox выполнения задачи */}
            <Checkbox
              {...{ inputProps: { 'aria-label': 'Checkbox demo' } }}
              onClick={onClickDone}
              checked={done ? true : false}
            />

            {/* Заголовок задачи */}
            <Typography variant='h5' component='div'>
              {title}
            </Typography>
            <Stack direction='row' spacing={0.5}>
              {/* Кнопка изменить */}
              <Button onClick={onClickChange} variant='contained'>
                Изменить
              </Button>

              {/* Кнопка удалить */}
              <Button onClick={onClickDelete} variant='outlined'>
                <DeleteIcon />
              </Button>
            </Stack>
          </Stack>

          {/* Описание задачи */}
          <Typography variant='body1'>{description}</Typography>

          {/* Ссылка на прикрепленный файл к задачи */}
          {/* Если файла нет – ссылка не отображается */}
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

          {/* Сроки выполнения задачи */}
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            {targetDate ? (
              <p>
                <b>Завершить до:</b> {targetDate}
              </p>
            ) : (
              'Задача без срока выполнения'
            )}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default TaskCard
