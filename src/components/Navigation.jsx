import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const navItems = ['Home','Reservations', 'Laundry', 'Drying'];

const Navigation = () => {
  const theme = useTheme();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const handleDrawerOpen = () => setDrawerOpen((prevState) => !prevState);

  const drawer = (
    <Box onClick={handleDrawerOpen} sx={{ textAlign: 'center' }}>
      <List>
        {navItems.map((item) => {
          const to = item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase()}`;
          const isActive = location.pathname === to;
          return (
            <Link key={item} to={item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase()}`} style={{ textDecoration: 'none', color: 'black' }}>
              <ListItem disablePadding>
                <ListItemButton sx={{ 
                  textAlign: 'center',
                  bgcolor: isActive ? 'primary.light' : 'transparent',
                  transition: 'background-color 0.2s ease-in-out',
                  '&:hover': { backgroundColor: isActive ? 'primary.main' : theme.palette.grey[200] } }}>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            </Link>
          )
        })}
      </List>
    </Box>
  );

  return (
    <div>
      <AppBar
        position='fixed'
        component='nav'
        sx={{
          boxShadow: 'none',
          backgroundColor: 'transparent',
          mt: 2
        }}
      >
        <Container maxWidth='lg'>
          <Toolbar sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            backgroundColor: 'rgba(38, 41, 55, 0.5)',
            backdropFilter: 'blur(20px)', 
            borderRadius: 10, 
            maxHeight: 40
            }}>

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {navItems.map((item, index) => {
                const to = item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase()}`;
                const isActive = location.pathname === to;
                return (
                  <Link key={index} to={to} style={{ textDecoration: 'none' }}>
                    <Button key={item} sx={{ 
                      bgcolor: isActive ? 'primary.main' : 'transparent',
                      borderRadius: 5,
                      color: 'white',
                      transition: 'background-color 0.4s ease-in-out',
                      '&:hover': { backgroundColor: isActive ? 'primary.main' : 'transparent' } }}>
                      {item}
                    </Button>
                  </Link>
                );
              })}
            </Box>

            <IconButton 
              onClick={handleDrawerOpen}
              sx={{ 
                color: 'inherit', 
                display: { xs: 'block', md: 'none' }
              }}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <nav>
        <Drawer
          anchor='right'
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerOpen}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </div>
  );
};

export default Navigation;