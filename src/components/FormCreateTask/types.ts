import * as yup from 'yup'

/** Типы полей для useForm */
export interface ITaskFields {
  title: string
  description: string
}

/** Валидация полей для useForm */
export const TaskSchema = yup.object().shape({
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
