import { createSlice } from '@reduxjs/toolkit'
import { fetchAllTasks } from './asyncActions'
import { Status, TaskItem, TasksSliceState } from './types'

const initialState: TasksSliceState = {
  tasks: [] as TaskItem[],
  tasksStatus: Status.LOADING
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Get all tasks
    builder.addCase(fetchAllTasks.pending, state => {
      state.tasksStatus = Status.LOADING
    })
    builder.addCase(fetchAllTasks.fulfilled, (state, action) => {
      state.tasks = action.payload
      state.tasksStatus = Status.SUCCESS
    })
    builder.addCase(fetchAllTasks.rejected, state => {
      state.tasksStatus = Status.ERROR
    })
  }
})

// export const {} = tasksSlice.actions

export default tasksSlice.reducer
