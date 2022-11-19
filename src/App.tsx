import React from 'react'

import NavBar from './components/NavBar'
import FormForTask from './components/FormTask/FormTask'
import TasksList from './components/TasksList'

import styles from './App.module.less'

/**
 * React функциональный компонент "Приложение TO DO LIST"
 */
const App: React.FC = () => {
  return (
    <>
      {/* Навигационная панель */}
      <div className={styles.navBar}>
        <NavBar />
      </div>

      {/* Обертка для формы и карточек задач */}
      <div className={styles.wrapper}>
        {/* Форма для создания задач */}
        <div className={styles.form}>
          <FormForTask />
        </div>

        {/* Карточки задач */}
        <div className={styles.tasks}>
          <TasksList />
        </div>
      </div>
    </>
  )
}

export default App
