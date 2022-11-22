/** Типы props для FormUpdateTask */
export type PropsFormForTask = {
  id: string
  title: string
  description: string
  targetDate: string | null
  fileURL: string | null
  done: boolean
}
