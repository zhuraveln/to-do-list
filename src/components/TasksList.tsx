import React, { useEffect, useState } from 'react'

import TaskCard from './TaskCard'
import FormUpdateTask from './FormUpdateTask/FormUpdateTask'
import Modal from './Modal'

import { useSelector } from 'react-redux'
import { useAppDispatch } from '../redux/store'
import { getAllTasks } from '../redux/tasks/asyncActions'
import { tasksSelector } from '../redux/tasks/selectors'
import { clearSelectTask } from '../redux/tasks/slice'
import { Status } from '../redux/tasks/types'
import { Typography } from '@mui/material'

/**
 * React функциональный компонент "Список всех задач"
 */
const TasksList: React.FC = () => {
  /** dispatch для работы с Redux */
  const dispatch = useAppDispatch()

  // Получение всех задач, выбранной задачи и статуса из Redux
  const { tasks, selectTask, tasksStatus } = useSelector(tasksSelector)

  // Состояние модального окна
  // Если выбрана задача (нажата кнопка "Изменить") – открывается модальное окно
  const [modalActive, setModalActive] = useState(false)

  // Обработчик события закрытия модального окна
  const handleCloseModal = () => {
    dispatch(clearSelectTask()) // удаление выбранной задачи в Redux
  }

  // При монтировании компонента получение всех задач из backend
  useEffect(() => {
    dispatch(getAllTasks())
  }, [])

  // Открытие/закрытие модального окна при измененении selectTask
  useEffect(() => {
    if (selectTask.id) {
      setModalActive(true) // открытие модального окна если есть выбранная задача
    } else {
      setModalActive(false) // закрытие модального окна если нет выбранной задачи
    }
  }, [selectTask.id])

  return (
    /** Список всех задач */
    <>
      {/* Карточки с задачами */}
      {tasks.length ? (
        // Карточки с задачами
        tasks.map(task => <TaskCard {...task} key={task.id} />)
      ) : (
        // Показ надписи в случае отсутсвия задач на backend
        <Typography variant='h5' color='text.secondary' textAlign='center'>
          У вас нет задач
        </Typography>
      )}

      {/* Модальное окно */}
      {/* Модальное окно отображается в случае наличия выбранной задачи (нажата кнопна "Изменить")*/}
      <Modal
        active={modalActive}
        setActive={handleCloseModal}
        title={'Изменить задачу'}
      >
        <FormUpdateTask {...selectTask} />
      </Modal>
    </>
  )
}

export default TasksList
