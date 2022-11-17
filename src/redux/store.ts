import { configureStore } from '@reduxjs/toolkit'
import tasks from './tasks/slice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    tasks
  }
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
