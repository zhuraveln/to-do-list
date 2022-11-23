import React, { useState } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Dayjs } from 'dayjs'
import 'dayjs/locale/ru'

import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import DeleteIcon from '@mui/icons-material/Delete'

import { useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'
import { tasksSelector } from '../../redux/tasks/selectors'
import { uploadTask } from '../../redux/tasks/asyncActions'

import { Status, UploadTaskParams } from '../../redux/tasks/types'
import { TaskSchema, ITaskFields } from './types'

/**
 * React функциональный компонент "Форма для создания задачи"
 */
const FormCreateTask: React.FC = () => {
  // Получение статуса задачи из Redux state
  const { tasksStatus } = useSelector(tasksSelector)

  /** dispatch для работы с actions Redux */
  const dispatch = useAppDispatch()

  // Состояние поля "Дата завершения"
  const [date, setDate] = useState<Dayjs | null>(null)

  // Состояние прикрепленного файла
  const [fileUpload, setFileUpload] = useState<File | null>(null)

  // Состояние свича для отображения поля с выбором даты завершения задачи
  const [switchDatePicker, setSwitchDatePicker] = useState<Boolean>(false)

  // Хук useForm для работы с формой (поля : заголовок, описание)
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ITaskFields>({
    mode: 'onChange',
    resolver: yupResolver(TaskSchema)
  })

  /** Обработчик события "onSubmit" для формы создания задачи */
  const onSubmit: SubmitHandler<ITaskFields> = async data => {
    // Создание задачи
    await dispatch(
      uploadTask({
        ...data,
        targetDate:
          switchDatePicker === true
            ? date?.format('DD.MM.YYYY H:mm') || null
            : null,
        file: fileUpload
      } as UploadTaskParams)
    )

    reset() // отчистка полей формы
    setFileUpload(null) // отчистка состояния загружаемого файла
    setDate(null) // отчистка состояния даты завершения задачи
    setSwitchDatePicker(false) // переключение чекбокса для отображения даты завершения задачи
  }

  return (
    // Форма для создания задачи
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={1} mb={4}>
        {/* Поле с заголовком задачи */}
        <Controller
          name='title'
          control={control}
          defaultValue=''
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
          defaultValue=''
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
                required={!!switchDatePicker}
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
            <Typography color='text.secondary'>
              <b>Файл для загрузки:</b> {fileUpload.name}
            </Typography>
            <DeleteIcon
              color='error'
              cursor='pointer'
              onClick={() => setFileUpload(null)}
            />
          </Stack>
        ) : (
          <Typography color='text.secondary'>Файл не выбран</Typography>
        )}
      </Stack>

      {/* Кнопка для загрузки задачи */}
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

export default FormCreateTask
