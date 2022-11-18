import React, { useEffect, useRef } from 'react'
import Dialog from '@mui/material/Dialog'
import { TaskItem } from '../redux/tasks/types'
import FormTask from './FormTask/FormTask'
import { useAppDispatch } from '../redux/store'
import { clearSelectTask } from '../redux/tasks/slice'
import { DialogContent, DialogTitle } from '@mui/material'

export interface DialogTitleProps {
  id: string
  children?: React.ReactNode
  onClose: () => void
}

const TaskModal: React.FC<TaskItem> = props => {
  const dispatch = useAppDispatch()

  const isMounted = useRef(false)

  const [open, setOpen] = React.useState(false)

  const handleClose = () => {
    setOpen(false)
    dispatch(clearSelectTask())
    isMounted.current = false
  }

  useEffect(() => {
    if (isMounted.current) {
      setOpen(true)
    }

    isMounted.current = true
  }, [props.id])

  return (
    <div>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle textAlign={'center'}>Изменить задачу</DialogTitle>
        <DialogContent>
          <FormTask {...props} modalOpen={open} closeModal={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TaskModal
