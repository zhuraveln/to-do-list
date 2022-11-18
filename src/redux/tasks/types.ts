export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export type TaskItem = {
  id: string
  title: string
  description: string
  targetDate: string
  fileURL: string
  done: boolean
}

export interface TasksSliceState {
  tasks: TaskItem[]
  tasksStatus: Status
  selectTask: TaskItem
}

export type UploadTaskParams = {
  title: string
  description: string
  targetDate: string | null
  file: File | null
}

export type DoneTaskParams = {
  id: string
  done: boolean
}
