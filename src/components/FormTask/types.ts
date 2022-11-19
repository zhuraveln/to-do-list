/** Типы props для FormTask */
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

/** Типы полей для useForm */
export interface ITaskFields {
  title: string
  description: string
}
