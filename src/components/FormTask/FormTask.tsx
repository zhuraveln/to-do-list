import React from 'react'
import { Button, Stack, TextField, Typography } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/ru'
import { SubmitHandler, useForm } from 'react-hook-form'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { useAppDispatch } from '../../redux/store'
import {
  getAllTasks,
  updateTask,
  uploadTask
} from '../../redux/tasks/asyncActions'
import { TaskItem } from '../../redux/tasks/types'

import { ITaskFields, PropsFormForTask } from './types'

const FormTask: React.FC<PropsFormForTask> = props => {
  const { id, title, description, targetDate, fileURL, modalOpen, closeModal } =
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
      // title: 'Nikita',
      // description: '12345'
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
          targetDate: date?.format('DD/MM/YYYY H:mm') || null,
          file: fileUpload
        })
      )
      reset()
      setFileUpload(null)
      setDate(null)
    }
  }

  // Dayjs
  const [date, setDate] = React.useState<Dayjs | null>(
    modalOpen
      ? targetDate
        ? dayjs(targetDate, 'DD/MM/YYYY H:mm')
        : null
      : null
  )
  const handleChangeDate = (newValue: Dayjs | null) => {
    setDate(newValue)
  }

  // Files
  const [fileUpload, setFileUpload] = React.useState<File | null>(null)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={1} mb={4}>
        <TextField
          id='outlined-required'
          label='Заголовок'
          defaultValue={title ? title : ''}
          {...register('title', {
            required: 'это обязательное поле!',
            minLength: {
              value: 3,
              message: 'минимальное кол-во символов 3'
            },
            maxLength: {
              value: 40,
              message: 'максимальное кол-во символов 40'
            }
          })}
        />
        {errors?.title && (
          <Typography variant='caption' color='text.secondary'>
            {errors.title.message}
          </Typography>
        )}

        <TextField
          id='outlined-required'
          label='Описание'
          defaultValue={description ? description : ''}
          {...register('description', {
            required: 'это обязательное поле!',
            minLength: {
              value: 3,
              message: 'минимальное кол-во символов 3'
            },
            maxLength: {
              value: 200,
              message: 'максимальное кол-во символов 200'
            }
          })}
        />
        {errors?.description && (
          <Typography variant='caption' color='text.secondary'>
            {errors.description.message}
          </Typography>
        )}
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
          <DateTimePicker
            label='Дата завершения'
            value={date}
            onChange={handleChangeDate}
            renderInput={params => <TextField {...params} />}
          />
        </LocalizationProvider>
        {!modalOpen && (
          <>
            <Button variant='contained' component='label'>
              Прикрепить файл
              <input
                hidden
                accept='image/*'
                multiple
                type='file'
                onChange={e =>
                  setFileUpload(e.target.files ? e.target.files[0] : null)
                }
              />
            </Button>
            <div>
              {fileUpload ? (
                <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                  <b>Файл для загрузки:</b> {fileUpload.name}
                </Typography>
              ) : (
                <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                  Нет прикрепленных файлов
                </Typography>
              )}
            </div>
          </>
        )}
      </Stack>
      <Stack>
        <Button type='submit' variant='contained' size='large'>
          Готово
        </Button>
      </Stack>
    </form>
  )
}

export default FormTask
