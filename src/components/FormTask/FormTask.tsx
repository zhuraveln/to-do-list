import React from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/ru'

import { Button, Link, Stack, TextField, Typography } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import AttachFileIcon from '@mui/icons-material/AttachFile'

import { useAppDispatch } from '../../redux/store'
import {
  getAllTasks,
  updateTask,
  uploadTask
} from '../../redux/tasks/asyncActions'

import {
  Status,
  UpdateTaskParams,
  UploadTaskParams
} from '../../redux/tasks/types'
import { createTaskSchema, ITaskFields, PropsFormForTask } from './types'
import { useSelector } from 'react-redux'
import { tasksSelector } from '../../redux/tasks/selectors'

/**
 * React функциональный компонент "Форма для создания/изменения задачи"
 * @params {props} объект типа PropsFormForTask
 */
const FormTask: React.FC<PropsFormForTask> = props => {
  /** Деструктуризация полученных данных из props */
  const { id, title, description, targetDate, fileURL, modalOpen, closeModal } =
    props

  /** Получение статуса задачи из Redux */
  const { tasksStatus } = useSelector(tasksSelector)

  /** Инициализация dispatch для работы с Redux */
  const dispatch = useAppDispatch()

  /** Состояние поля "Дата завершения" */
  /** Установка состояния по умолчанию в зависимости от активности модального окна */
  const [date, setDate] = React.useState<Dayjs | null>(
    modalOpen // если модальное окно активно
      ? targetDate // и у выбранной задачи имеется дата завершения
        ? dayjs(targetDate, 'DD/MM/YYYY H:mm') // устанавливается дата завершения выбранной задачи
        : null // поле чисто при отсутствии даты завершения у выбранной задачи
      : null // поле чисто при неактивном модальном окне
  )

  /** Состояние прикрепленного файла */
  const [fileUpload, setFileUpload] = React.useState<File | null>(null)

  /** Инициализация хука useForm для работы с формой*/
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ITaskFields>({
    mode: 'onChange',
    resolver: yupResolver(createTaskSchema)
  })

  /** Обработчик события "onSubmit" для формы создания/обновления задачи */
  const onSubmit: SubmitHandler<ITaskFields> = async data => {
    /** При активном модальном окне – обновление полей выбранной задачи */
    if (modalOpen) {
      await dispatch(
        updateTask({
          // обновление задачи
          ...data,
          id,
          targetDate: date?.format('DD/MM/YYYY H:mm') || null,
          fileURL,
          file: fileUpload
        } as UpdateTaskParams)
      )
      dispatch(getAllTasks()) // получение всех задач после обновления полей задачи
      closeModal() // закрытие модального окна

      /** При неактивном модальном окне – загрузка новой задачи  */
    } else {
      dispatch(
        uploadTask({
          // загрузка новой задачи
          ...data,
          targetDate: date?.format('DD/MM/YYYY H:mm') || null,
          file: fileUpload
        } as UploadTaskParams)
      )
      reset() // отчистка полей формы
      setFileUpload(null) // отчистка состояния загружаемого файла
      setDate(null) // отчистка состояния выб
    }
  }

  return (
    // Форма для создания/обновления задачи
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={1} mb={4}>
        {/* Поле с заголовком задачи */}
        <Controller
          name='title'
          control={control}
          defaultValue={title ? title : ''}
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
          defaultValue={description ? description : ''}
          render={({ field }) => (
            <TextField
              {...field}
              label='Описание'
              error={!!errors.description}
              helperText={errors.description ? errors.description.message : ''}
            />
          )}
        />

        {/* Поле с выбором даты завершения задачи */}
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
          <DateTimePicker
            label='Дата завершения'
            value={date}
            onChange={e => setDate(e)}
            renderInput={params => <TextField {...params} />}
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
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            <b>Файл для загрузки:</b> {fileUpload.name}
          </Typography>
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
            Нет прикрепленного файла
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
