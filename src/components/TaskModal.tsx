import React, { useEffect, useRef } from 'react'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import { TaskItem } from '../redux/tasks/types'
import FormTask from './FormTask'
import { useAppDispatch } from '../redux/store'
import { clearSelectTask } from '../redux/tasks/slice'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(10)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

export interface DialogTitleProps {
  id: string
  children?: React.ReactNode
  onClose: () => void
}

const Modal: React.FC<TaskItem> = props => {
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
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <FormTask {...props} modalOpen={open} closeModal={handleClose} />
      </BootstrapDialog>
    </div>
  )
}

export default Modal
