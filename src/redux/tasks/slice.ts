import { createSlice } from '@reduxjs/toolkit'
import {
  deleteTask,
  doneTask,
  getAllTasks,
  updateTask,
  uploadTask
} from './asyncActions'
import { Status, TaskItem, TasksSliceState } from './types'

const initialState: TasksSliceState = {
  tasks: [] as TaskItem[],
  tasksStatus: Status.LOADING,

  selectTask: {} as TaskItem
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    /** Устанавливает в selectTask выбранную задачу */
    setSelectTask(state, action) {
      state.selectTask = action.payload
    },
    /** Отчищает selectTask */
    clearSelectTask(state) {
      state.selectTask = {} as TaskItem
    }
  },
  extraReducers: builder => {
    /** Получение всех задач */
    builder.addCase(getAllTasks.pending, state => {
      state.tasksStatus = Status.LOADING
    })
    builder.addCase(getAllTasks.fulfilled, (state, action) => {
      state.tasks = action.payload
      state.tasksStatus = Status.SUCCESS
    })
    builder.addCase(getAllTasks.rejected, state => {
      state.tasksStatus = Status.ERROR
    })

    /** Загрузка задачи */
    builder.addCase(uploadTask.pending, state => {
      state.tasksStatus = Status.LOADING
    })
    builder.addCase(uploadTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload)
      state.tasksStatus = Status.SUCCESS
    })
    builder.addCase(uploadTask.rejected, state => {
      state.tasksStatus = Status.ERROR
    })

    /** Изменения состояния выполнения задачи */
    builder.addCase(doneTask.pending, state => {
      state.tasksStatus = Status.LOADING
    })
    builder.addCase(doneTask.fulfilled, (state, action) => {
      const findTask = state.tasks.find(item => item.id === action.payload)

      if (findTask) {
        findTask.done = !findTask.done
      }

      state.tasksStatus = Status.SUCCESS
    })
    builder.addCase(doneTask.rejected, state => {
      state.tasksStatus = Status.ERROR
    })

    /** Обновление полей задачи */
    builder.addCase(updateTask.pending, state => {
      state.tasksStatus = Status.LOADING
    })
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.tasksStatus = Status.SUCCESS
    })
    builder.addCase(updateTask.rejected, state => {
      state.tasksStatus = Status.ERROR
    })

    /** Удаление задачи */
    builder.addCase(deleteTask.pending, state => {
      state.tasksStatus = Status.LOADING
    })
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
      state.tasksStatus = Status.SUCCESS
    })
    builder.addCase(deleteTask.rejected, state => {
      state.tasksStatus = Status.ERROR
    })
  }
})

export const { setSelectTask, clearSelectTask } = tasksSlice.actions

export default tasksSlice.reducer
