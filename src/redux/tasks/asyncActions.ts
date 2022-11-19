import { createAsyncThunk } from '@reduxjs/toolkit'
import TasksAPI from '../../API/TasksAPI'
import { DoneTaskParams, TaskItem, UploadTaskParams } from './types'

/**
 * Асинхронный action для получения всех задач с помощью API
 * @return {TaskItem[]} массив задач из коллекции
 */
export const getAllTasks = createAsyncThunk(
  'tasks/getAllTasksStatus',
  async () => {
    const data = await TasksAPI.fetchGetAllTasks()

    return data as TaskItem[]
  }
)

/**
 * Асинхронный action для загрузки новой задачи и прикрепленного файла с помощью API
 * @param {UploadTaskParams} params данные для создания задачи
 * @return {TaskItem} новая загруженная задача из коллекции
 */
export const uploadTask = createAsyncThunk(
  'tasks/uploadTaskStatus',
  async (params: UploadTaskParams) => {
    const data = await TasksAPI.fetchUploadTask(params)

    return data as TaskItem
  }
)

/**
 * Асинхронный action для изменения состояния выполнения с помощью API
 * @param {DoneTaskParams} newData данные изменения состояния задачи
 * @return {strind} id измененной задачи
 */
export const doneTask = createAsyncThunk(
  'tasks/doneTaskStatus',
  async (newData: DoneTaskParams) => {
    const id = await TasksAPI.fetchDoneTask(newData)

    return id as string
  }
)

/**
 * Асинхронный action для обновления полей задачи с помощью API
 * @param {TaskItem} newData данные для обновления задачи
 */
export const updateTask = createAsyncThunk(
  'tasks/updateTaskStatus',
  async (newData: TaskItem) => {
    await TasksAPI.fetchUpdateTask(newData)
  }
)

/**
 * Асинхронный action для удаления задачи с помощью API
 * @param {DoneTaskParams} newData данные изменения состояния задачи
 * @return {strind} id удаленной задачи
 */
export const deleteTask = createAsyncThunk(
  'tasks/deleteTaskStatus',
  async (id: string) => {
    await TasksAPI.fetchDeleteTask(id)

    return id
  }
)
