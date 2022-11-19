import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/ru'

import { Button, Stack, TextField, Typography } from '@mui/material'
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

/**
 * React функциональный компонент "Форма для создания/изменения задачи"
 * @params {props} в виде объекта типа PropsFormForTask
 */
const FormTask: React.FC<PropsFormForTask> = props => {
  /** Деструктуризация полученных данных из props */
  const { id, title, description, targetDate, modalOpen, closeModal } = props

  /** Инициализация dispatch для работы с Redux */
  const dispatch = useAppDispatch()

  /** Инициализация хука useForm */
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ITaskFields>({
    mode: 'onChange'
  })

  /** Асинхронная функция для создания/обновления задачи */
  const onSubmit: SubmitHandler<ITaskFields> = async data => {
    /** Если модального окно открыто – обновление полей задачи */
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

      /** При закрытом модальном окне – загрузка новой задачи  */
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

  /** Инициализация хука useState для работы датами */
  /** Установка состояния по умолчанию в зависимости от состояния модального окна */
  const [date, setDate] = React.useState<Dayjs | null>(
    modalOpen
      ? targetDate
        ? dayjs(targetDate, 'DD/MM/YYYY H:mm')
        : null
      : null
  )

  /** Функция обработчик события при изменения полей в <DateTimePicker/> */
  const handleChangeDate = (newValue: Dayjs | null) => {
    setDate(newValue)
  }

  /** Инициализация хука useState для работы с прикрепленными файлами */
  const [fileUpload, setFileUpload] = React.useState<File | null>(null)

  return (
    /** Форма для создания/обновления задачи */
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={1} mb={4}>
        {/* Поле с заголовком задачи */}
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
          <Typography variant='caption' color='#ff7b7b'>
            {errors.title.message}
          </Typography>
        )}

        {/* Поле с описанием задачи */}
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
          <Typography variant='caption' color='#ff7b7b'>
            {errors.description.message}
          </Typography>
        )}

        {/* Поле с выбором даты завершения задачи */}
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
          <DateTimePicker
            label='Дата завершения'
            value={date}
            onChange={handleChangeDate}
            renderInput={params => <TextField {...params} />}
          />
        </LocalizationProvider>

        {/* Кнопка прикрепления файла */}
        {/* При открытом модальном окне кнопка не отображается */}
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
                  Нет прикрепленного файла
                </Typography>
              )}
            </div>
          </>
        )}
      </Stack>

      {/* Кнопка для загрузки/обновления задачи */}
      <Stack>
        <Button type='submit' variant='contained' size='large'>
          Готово
        </Button>
      </Stack>
    </form>
  )
}

export default FormTask
