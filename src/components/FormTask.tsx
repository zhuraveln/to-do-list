import React from 'react'
import { Button, TextField } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/ru'
import { SubmitHandler, useForm } from 'react-hook-form'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { useAppDispatch } from '../redux/store'
import {
  getAllTasks,
  updateTask,
  uploadTask
} from '../redux/tasks/asyncActions'
import { TaskItem } from '../redux/tasks/types'

type PropsFormForTask = {
  id?: string
  title?: string
  description?: string
  targetDate?: string
  filesURL?: string
  done?: boolean
  modalOpen?: boolean
  closeModal?: any
}

interface ITaskFields {
  title: string
  description: string
}

const FormTask: React.FC<PropsFormForTask> = props => {
  const { id, title, description, done, targetDate, modalOpen, closeModal } =
    props

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ITaskFields>({
    mode: 'onChange',
    defaultValues: {
      title: 'Nikita',
      description: '12345'
    }
  })

  const onSubmit: SubmitHandler<ITaskFields> = async data => {
    if (modalOpen) {
      await dispatch(
        updateTask({
          ...data,
          id,
          targetDate: date?.format('DD/MM/YYYY H:mm') || null
        } as TaskItem)
      )
      dispatch(getAllTasks())
      closeModal()
    } else {
      dispatch(
        uploadTask({
          ...data,
          targetDate: date?.format('DD/MM/YYYY H:mm') || null
        })
      )
      reset()
    }
  }

  // Dayjs .format('DD/MM/YYYY H:m')
  const [date, setDate] = React.useState<Dayjs | null>(
    modalOpen ? dayjs(targetDate, 'DD/MM/YYYY H:mm') : null
    // dayjs(targetDate) || dayjs('2022/11/18 21:11')
  )
  const handleChangeDate = (newValue: Dayjs | null) => {
    setDate(newValue)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        id='outlined-required'
        label='Заголовок'
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
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
        <DateTimePicker
          label='Дата завершения'
          value={date}
          onChange={handleChangeDate}
          renderInput={params => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Button type='submit' variant='contained' size='large'>
        Готово
      </Button>
    </form>
  )
}

export default FormTask
