import React, { useEffect } from 'react'

import TaskCard from './TaskCard'
import TaskModal from './TaskModal'

import { useSelector } from 'react-redux'
import { useAppDispatch } from '../redux/store'
import { getAllTasks } from '../redux/tasks/asyncActions'
import { tasksSelector } from '../redux/tasks/selectors'

/**
 * React функциональный компонент "Список всех задач"
 */
const TasksList: React.FC = () => {
  /** Инициализация dispatch для работы с Redux */
  const dispatch = useAppDispatch()

  /** Получение всех задач и выбранной из Redux */
  const { tasks, selectTask } = useSelector(tasksSelector)

  /** При первом монтировании компонента отправлять запрос на Firebase */
  useEffect(() => {
    dispatch(getAllTasks())
  }, [])

  return (
    /** Список всех задач */
    <>
      {/* Карточки с задачами */}
      {tasks && tasks.map(task => <TaskCard {...task} key={task.id} />)}

      {/* Модальное окно */}
      {/* Модальное окно отображается в случае наличия выбранной задачи (нажата кнопна "Изменить")*/}
      {selectTask && <TaskModal {...selectTask} />}
    </>
  )
}

export default TasksList
