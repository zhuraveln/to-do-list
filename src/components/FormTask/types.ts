export type PropsFormForTask = {
  id?: string
  title?: string
  description?: string
  targetDate?: string
  fileURL?: string
  done?: boolean
  modalOpen?: boolean
  closeModal?: any
}

export interface ITaskFields {
  title: string
  description: string
}
