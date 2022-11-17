import { createAsyncThunk } from '@reduxjs/toolkit'
import TasksAPI from '../../API/TasksAPI'
import { TaskItem } from './types'

export const fetchAllTasks = createAsyncThunk(
  'tasks/fetchAllTasksStatus',
  async () => {
    const data = await TasksAPI.getAllTasks()

    return data as TaskItem[]
  }
)
