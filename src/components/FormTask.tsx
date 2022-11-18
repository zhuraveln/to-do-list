import React from 'react'
import { Button, TextField } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { SubmitHandler, useForm } from 'react-hook-form'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { useAppDispatch } from '../redux/store'
import { uploadTask } from '../redux/tasks/asyncActions'
import { TaskItem } from '../redux/tasks/types'

type FormForTask = {
  id?: string
  title?: string
  description?: string
  targetDate?: string
  filesURL?: string
  done?: boolean
}

interface ITaskFields {
  title: string
  description: string
}

const FormTask: React.FC<FormForTask> = props => {
  const { id, title, description, done } = props

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ITaskFields>({
    mode: 'onChange',
    defaultValues: {
      // title: 'Nikita',
      // description: '12345'
    }
  })

  const onSubmit: SubmitHandler<ITaskFields> = data => {
    dispatch(uploadTask(data))
    reset()
  }

  // Dayjs
  const [date, setDate] = React.useState<Dayjs | null>(
    dayjs('2022-10-18T21:11:54')
  )
  const handleChange = (newValue: Dayjs | null) => {
    setDate(newValue)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        id='outlined-required'
        label='Название задачи'
        defaultValue={title ? title : ''}
        {...register('title', {
          required: 'Это обязательное поле!',
          minLength: {
            value: 3,
            message: 'минимальное кол-во символов 3'
          },
          maxLength: {
            value: 20,
            message: 'максимальное кол-во символов 20'
          }
        })}
      />
      {errors?.title && <p>{errors.title.message}</p>}

      <TextField
        id='outlined-required'
        label='Описание'
        defaultValue={description ? description : ''}
        {...register('description', {
          required: 'Это обязательное поле!',
          minLength: {
            value: 3,
            message: 'минимальное кол-во символов 3'
          },
          maxLength: {
            value: 20,
            message: 'максимальное кол-во символов 20'
          }
        })}
      />
      {errors?.description && <p>{errors.description.message}</p>}
      {/* <Button variant='contained' component='label'>
        Прикрепить файл
        <input hidden accept='image/*' multiple type='file' />
      </Button> */}
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label='Date&Time picker'
          value={date}
          onChange={handleChange}
          renderInput={params => <TextField {...params} />}
        />
      </LocalizationProvider> */}
      <Button type='submit' variant='contained' size='large'>
        Готово
      </Button>
    </form>
  )
}

export default FormTask
