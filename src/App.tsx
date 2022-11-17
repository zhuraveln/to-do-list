import React, { useEffect } from 'react'

import FormForTask from './components/FormTask'
import NavBar from './components/NavBar'
import TaskCard from './components/TaskCard'

import { useAppDispatch } from './redux/store'
import { fetchAllTasks } from './redux/tasks/asyncActions'

import styles from './App.module.scss'
import { useSelector } from 'react-redux'
import { tasksSelector } from './redux/tasks/selectors'

const App: React.FC = () => {
  const dispatch = useAppDispatch()

  const { tasks, tasksStatus } = useSelector(tasksSelector)

  useEffect(() => {
    dispatch(fetchAllTasks())
  }, [])

  return (
    <div className={styles.root}>
      <NavBar />
      <div className={styles.wrapper}>
        <div className={styles.form}>
          <FormForTask />
        </div>
        <div className={styles.tasks}>
          {tasks && tasks.map(task => <TaskCard {...task} key={task.id} />)}
        </div>
      </div>
    </div>
  )
}

export default App
