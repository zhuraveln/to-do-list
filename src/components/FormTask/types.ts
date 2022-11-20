import * as yup from 'yup'

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

/** Валидация полей для useForm */
export const createTaskSchema = yup.object().shape({
  title: yup
    .string()
    .required('это обязательное поле')
    .min(3, 'минимальная длина 3 символа')
    .max(30, 'максимальная длина 30 символов'),
  description: yup
    .string()
    .required('это обязательное поле')
    .min(3, 'минимальная длина 3 символа')
    .max(300, 'максимальная длина 300 символов')
})
