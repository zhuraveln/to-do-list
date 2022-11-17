import React from 'react'

import NavBar from './components/NavBar'
import FormForTask from './components/FormTask'
import TasksList from './components/TasksList'

import styles from './App.module.scss'

const App: React.FC = () => {
  return (
    <div className={styles.root}>
      <NavBar />
      <div className={styles.wrapper}>
        <div className={styles.form}>
          <FormForTask />
        </div>
        <div className={styles.tasks}>
          <TasksList />
        </div>
      </div>
    </div>
  )
}

export default App
