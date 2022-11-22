/** Статус выполнения */
export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

/** Типы полей объекта задачи  */
export type TaskItem = {
  id: string
  title: string
  description: string
  targetDate: string
  fileURL: string
  done: boolean
}

/** Типы полей объекта state  */
export interface TasksSliceState {
  tasks: TaskItem[]
  tasksStatus: Status
  selectTask: TaskItem
}

/** Типы полей объекта задачи для загрузки */
export type UploadTaskParams = {
  title: string
  description: string
  targetDate: string | null
  fileURL: string | null
  file?: File | null
}

/** Типы полей объекта задачи для обновления */
export type UpdateTaskParams = {
  id: string
  title: string
  description: string
  targetDate: string | null
  file?: File | null
  fileURL?: string | null
}

/** Типы полей объекта файла для загрузки/обновления */
export type UploadFileParams = {
  file: File | null | undefined
}

/** Типы полей объекта задачи для обновления состояния выполнения */
export type DoneTaskParams = {
  id: string
  done: boolean
}
