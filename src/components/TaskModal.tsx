import React, { useEffect, useRef } from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import { TaskItem } from '../redux/tasks/types'
import FormTask from './FormTask'

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

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

const Modal: React.FC<TaskItem> = props => {
  const { id, title, description, done } = props

  const isMounted = useRef(false)

  const [open, setOpen] = React.useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (isMounted.current) {
      setOpen(true)
    }

    isMounted.current = true
  }, [id])

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <FormTask {...props} />

        {/* <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={handleClose}
        >
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{description}</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions> */}
      </BootstrapDialog>
    </div>
  )
}

export default Modal
