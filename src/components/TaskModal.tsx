import React, { useEffect, useRef } from 'react'

import Dialog from '@mui/material/Dialog'
import { DialogContent, DialogContentText } from '@mui/material'

import FormTask from './FormTask/FormTask'

import { TaskItem } from '../redux/tasks/types'
import { useAppDispatch } from '../redux/store'
import { clearSelectTask } from '../redux/tasks/slice'

/**
 * React функциональный компонент "Модальное окно Задачи"
 * @params {props} объект типа TaskItem
 */
const TaskModal: React.FC<TaskItem> = props => {
  /** Инициализация dispatch для работы с Redux */
  const dispatch = useAppDispatch()

  /** Инициализация хука useRef */
  /** Установка значения 'false' в поле current для отслеживания монтирования компонента */
  const isMounted = useRef(false)

  /** Инициализация хука useState для отслеживания состояния модального окна */
  const [open, setOpen] = React.useState(false)

  /** Функция обработчик события клика на зону вне модального окна для его закрытия */
  const handleClose = () => {
    setOpen(false)
    dispatch(clearSelectTask())
    isMounted.current = false
  }

  /** При первом монтировании компонента не открывать модальное окно */
  /** При изменении id открывать модальное окно */
  useEffect(() => {
    if (isMounted.current) {
      setOpen(true)
    }

    isMounted.current = true
  }, [props.id])

  return (
    /** Модальное окно */
    <div>
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth={'sm'}>
        {/* Заголовок модального окна */}
        <DialogContentText textAlign={'center'} variant='h4' paddingTop={2}>
          Изменить задачу
        </DialogContentText>

        {/* Контент отображающийся внутри модального окна */}
        <DialogContent>
          <FormTask {...props} modalOpen={open} closeModal={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TaskModal
