import React from 'react'

import NavBar from './components/NavBar'
import TasksList from './components/TasksList'

import styles from './App.module.less'
import FormCreateTask from './components/FormCreateTask/FormCreateTask'

/**
 * React функциональный компонент "Приложение TO DO LIST"
 */
const App: React.FC = () => {
  return (
    <>
      {/* Блок с навигационной панелью */}
      <div className={styles.navBar}>
        <NavBar />
      </div>

      {/* Обертка для формы создания задачи и карточек задач */}
      <div className={styles.wrapper}>
        {/* Блок формы для создания задачи */}
        <div className={styles.form}>
          <FormCreateTask />
        </div>

        {/* Блок с карточками задач */}
        <div className={styles.tasks}>
          <TasksList />
        </div>
      </div>
    </>
  )
}

export default App
