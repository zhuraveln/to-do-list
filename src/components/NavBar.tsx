import React from 'react'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'

/**
 * React функциональный компонент "Навигационная панель"
 */
const NavBar: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            TO DO!
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
