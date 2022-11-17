import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../redux/store'
import { getAllTasks } from '../redux/tasks/asyncActions'
import { tasksSelector } from '../redux/tasks/selectors'

import TaskCard from './TaskCard'
import TaskModal from './TaskModal'

const TasksList: React.FC = () => {
  const dispatch = useAppDispatch()

  const { tasks, selectTask } = useSelector(tasksSelector)

  useEffect(() => {
    dispatch(getAllTasks())
  }, [])

  return (
    <>
      {tasks && tasks.map(task => <TaskCard {...task} key={task.id} />)}
      {selectTask && <TaskModal {...selectTask} />}
    </>
  )
}

export default TasksList
