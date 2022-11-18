import { createAsyncThunk } from '@reduxjs/toolkit'
import TasksAPI from '../../API/TasksAPI'
import { DoneTaskParams, TaskItem, UploadTaskParams } from './types'

// Get All Tasks
export const getAllTasks = createAsyncThunk(
  'tasks/getAllTasksStatus',
  async () => {
    const data = await TasksAPI.fetchGetAllTasks()

    return data as TaskItem[]
  }
)

// Upload Task
export const uploadTask = createAsyncThunk(
  'tasks/uploadTaskStatus',
  async (params: UploadTaskParams) => {
    const data = await TasksAPI.fetchUploadTask(params)

    return data as TaskItem
  }
)

// Set done Task
export const doneTask = createAsyncThunk(
  'tasks/doneTaskStatus',
  async (newData: DoneTaskParams) => {
    const data = await TasksAPI.fetchDoneTask(newData)

    return data as string
  }
)

// Update Task
export const updateTask = createAsyncThunk(
  'tasks/updateTaskStatus',
  async (newData: TaskItem) => {
    await TasksAPI.fetchUpdateTask(newData)
  }
)

// Delete Task
export const deleteTask = createAsyncThunk(
  'tasks/deleteTaskStatus',
  async (id: string) => {
    await TasksAPI.fetchDeleteTask(id)

    return id
  }
)
