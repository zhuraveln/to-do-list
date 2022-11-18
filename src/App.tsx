import React from 'react'

import NavBar from './components/NavBar'
import FormForTask from './components/FormTask/FormTask'
import TasksList from './components/TasksList'

import styles from './App.module.less'

const App: React.FC = () => {
  return (
    <>
      <div className={styles.navBar}>
        <NavBar />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.form}>
          <FormForTask />
        </div>
        <div className={styles.tasks}>
          <TasksList />
        </div>
      </div>
    </>
  )
}

export default App
