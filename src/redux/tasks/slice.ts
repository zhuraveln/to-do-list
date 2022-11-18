import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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
    onChangeTask(state, action) {
      state.selectTask = action.payload
    },
    clearSelectTask(state) {
      state.selectTask = {} as TaskItem
    }
  },
  extraReducers: builder => {
    // Get all tasks
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

    // Upload task
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

    // Done task
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

    // Update task
    builder.addCase(updateTask.pending, state => {
      state.tasksStatus = Status.LOADING
    })
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.tasksStatus = Status.SUCCESS
    })
    builder.addCase(updateTask.rejected, state => {
      state.tasksStatus = Status.ERROR
    })

    // Delete task
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

export const { onChangeTask, clearSelectTask } = tasksSlice.actions

export default tasksSlice.reducer
