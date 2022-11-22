import React from 'react'

import Dialog from '@mui/material/Dialog'
import { DialogContent, DialogContentText } from '@mui/material'

/**
 * React функциональный компонент "Модальное окно"
 */
const Modal: React.FC<any> = ({ active, setActive, title, children }) => {
  return (
    // Модальное окно
    <Dialog open={active} onClose={setActive} fullWidth maxWidth={'sm'}>
      {/* Заголовок модального окна */}
      <DialogContentText textAlign={'center'} variant='h4' paddingTop={2}>
        {title}
      </DialogContentText>

      {/* Контент отображающийся внутри модального окна */}
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}

export default Modal
