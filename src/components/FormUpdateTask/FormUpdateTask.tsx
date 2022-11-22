import React, { useState } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/ru'

import {
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import AttachFileIcon from '@mui/icons-material/AttachFile'

import { useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'
import { tasksSelector } from '../../redux/tasks/selectors'
import { getAllTasks, updateTask } from '../../redux/tasks/asyncActions'
import { clearSelectTask } from '../../redux/tasks/slice'

import { Status, UpdateTaskParams } from '../../redux/tasks/types'
import { PropsFormForTask } from './types'
import { ITaskFields, TaskSchema } from '../FormCreateTask/types'

/**
 * React функциональный компонент "Форма для изменения задачи"
 */
const FormTask: React.FC<PropsFormForTask> = props => {
  // Деструктуризация полученных данных из props
  const { id, title, description, targetDate, fileURL } = props

  // Получение статуса задачи из Redux state
  const { tasksStatus } = useSelector(tasksSelector)

  /** dispatch для работы с actions Redux */
  const dispatch = useAppDispatch()

  //Состояние поля "Дата завершения"
  const [date, setDate] = useState<Dayjs | null>(
    targetDate // если у выбранной задачи имеется дата завершения
      ? dayjs(targetDate, 'DD.MM.YYYY H:mm') // устанавливается дата завершения выбранной задачи
      : null // поле чистое при отсутствии даты завершения у выбранной задачи
  )

  // Состояние прикрепленного файла
  const [fileUpload, setFileUpload] = useState<File | null>(null)

  // Состояние checkbox для отображения поля с выбором даты завершения задачи
  const [switchDatePicker, setSwitchDatePicker] = useState<Boolean>(
    targetDate ? true : false // переводит checkbox в активное положение, если у задачи есть дата завершения
  )

  // Хук useForm для работы с формой
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ITaskFields>({
    mode: 'onChange',
    resolver: yupResolver(TaskSchema)
  })

  /** Обработчик события "onSubmit" для формы обновления задачи */
  const onSubmit: SubmitHandler<ITaskFields> = async data => {
    // обновление полей задачи
    await dispatch(
      updateTask({
        ...data,
        id,
        targetDate: date?.format('DD.MM.YYYY H:mm') || null,
        fileURL,
        file: fileUpload
      } as UpdateTaskParams)
    )

    dispatch(clearSelectTask()) // удаление выбранной задачи в Redux
    dispatch(getAllTasks()) // получение всех задач после обновления полей задачи
  }

  return (
    // Форма для обновления задачи
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={1} mb={4}>
        {/* Поле с заголовком задачи */}
        <Controller
          name='title'
          control={control}
          defaultValue={title}
          render={({ field }) => (
            <TextField
              {...field}
              label='Заголовок'
              error={!!errors.title}
              helperText={errors.title ? errors.title.message : ''}
            />
          )}
        />

        {/* Поле с описанием задачи */}
        <Controller
          name='description'
          control={control}
          defaultValue={description}
          render={({ field }) => (
            <TextField
              {...field}
              label='Описание'
              error={!!errors.description}
              helperText={errors.description ? errors.description.message : ''}
            />
          )}
        />

        {/* Checkbox для активации поля даты выполнения задачи */}
        <FormControlLabel
          control={
            <Checkbox
              checked={!!switchDatePicker}
              {...{ inputProps: { 'aria-label': 'Checkbox demo' } }}
              onClick={() => {
                setSwitchDatePicker(!switchDatePicker)
                setDate(null)
              }}
            />
          }
          label='Установить дату завершения'
        />

        {/* Поле с выбором даты завершения задачи */}
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
          <DateTimePicker
            disabled={!!!switchDatePicker}
            label='Дата завершения'
            value={date}
            onChange={event => setDate(event)}
            renderInput={params => (
              <TextField
                {...params}
                inputProps={{
                  ...params.inputProps,
                  placeholder: 'дд.мм.гггг чч:мм'
                }}
              />
            )}
          />
        </LocalizationProvider>

        {/* Кнопка для прикрепления файла */}
        <Button variant='contained' component='label'>
          Прикрепить файл
          <input
            hidden
            multiple
            type='file'
            onChange={e =>
              setFileUpload(e.target.files ? e.target.files[0] : null)
            }
          />
        </Button>

        {/* Информация о загружаемом файле */}
        {fileUpload ? (
          <Stack direction='row' spacing={0.3}>
            <AttachFileIcon />
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              <b>Файл для загрузки:</b> {fileUpload.name}
            </Typography>
          </Stack>
        ) : fileURL ? (
          <Stack direction='row' spacing={0.3}>
            <AttachFileIcon />
            <Typography variant='body1'>
              <Link href={fileURL} target='_blank'>
                <b>Прикрепленный файл</b>
              </Link>
            </Typography>
          </Stack>
        ) : (
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            Файл не выбран
          </Typography>
        )}
      </Stack>

      {/* Кнопка для загрузки/обновления задачи */}
      <Stack>
        <LoadingButton
          type='submit'
          variant='contained'
          size='large'
          loading={tasksStatus === Status.LOADING}
        >
          Готово
        </LoadingButton>
      </Stack>
    </form>
  )
}

export default FormTask
