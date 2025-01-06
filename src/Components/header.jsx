import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { NavLink } from 'react-router-dom'
import { UserContext } from './context/contextAuth';



function Navigation() {

  const{auth} = React.useContext(UserContext)
 
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Baty end company
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-evenly' }}>
            <Typography><NavLink to="/" style={{ color: 'inherit', textDecoration: 'none' }} >Рецепты ваших блюд</NavLink></Typography>
            <Typography><NavLink to="goods" style={{ color: 'inherit', textDecoration: 'none' }} >Список забытых вещей</NavLink></Typography>
            {auth ? null : <Typography><NavLink to="authorization" style={{ color: 'inherit', textDecoration: 'none' }}>Регистрация</NavLink></Typography>}
            {!auth ? <Typography><NavLink to="login" style={{ color: 'inherit', textDecoration: 'none' }}>login</NavLink></Typography> : <Typography><NavLink to="login" style={{ color: 'inherit', textDecoration: 'none' }}>logout</NavLink></Typography>}
          </Box>


        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navigation;