import * as React from 'react'
import { Box } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import MenuIcon from '@mui/icons-material/Menu'
import LanguageIcon from '@mui/icons-material/Language'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import LogoutIcon from '@mui/icons-material/Logout'
import Tooltip from '@mui/material/Tooltip'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/userContext'
import { useTranslation } from 'react-i18next'
import { createRouteMapping } from '../utils'

const locales = ['fi', 'en', 'sv']

const Navigation = () => {
  const theme = useTheme()
  const location = useLocation()
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const handleDrawerOpen = () => setDrawerOpen((prevState) => !prevState)
  const navigate = useNavigate()
  const { user, logout } = useUser()
  const { t, i18n } = useTranslation()
  const routes = createRouteMapping(t)

  //* Menu for language selection
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleLangMenuClick = (event) => setAnchorEl(event.currentTarget)
  const [anchorForDrawer, setAnchorForDrawer] = React.useState(null)
  const openAnchorInDrawer = Boolean(anchorForDrawer)
  const handleLangMenuClickInDrawer = (event) => setAnchorForDrawer(event.currentTarget)
  const handleLangMenuClose = () => {
    setAnchorEl(null),
    setAnchorForDrawer(null)
  }

  const handleLangChange = (lang) => {
    i18n.changeLanguage(lang)
    handleLangMenuClose()
  }

  //* Prevent drawer close when clicking the language menu
  const preventDrawerClose = (event) => event.stopPropagation()

  const navItems = user
    ? [t('nav.home'), t('nav.reservations'), t('nav.laundry'), t('nav.drying')]
    : [t('nav.home'), t('nav.signin'), t('nav.signup')]

  const handleSignOut = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.log('Sign out error:', error)
    }
  }

  const drawer = (
    <Box onClick={handleDrawerOpen} sx={{ textAlign: 'center' }}>
      <List>
        {navItems.map((item) => {
          const to = routes[item]
          const isActive = location.pathname === to
          return (
            <Link key={item} to={to} style={{ textDecoration: 'none', color: 'black' }}>
              <ListItem disablePadding>
                <ListItemButton disableRipple
                  sx={{
                    mx: 2,
                    textAlign: 'center',
                    color: isActive ? 'primary.dark' : 'inherit',
                    transition: 'all 0.2s ease-in-out',
                    borderRadius: 3,
                    '&:hover': { backgroundColor: theme.palette.grey[200] }
                  }}>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            </Link>
          )
        })}

        <Divider sx={{ mx: 2, my: 1 }}/>

        <Box onClick={preventDrawerClose}>
          <ListItemButton disableRipple
            sx={{
              mx: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'inherit',
              transition: 'all 0.2s ease-in-out',
              borderRadius: 3,
              '&:hover': { backgroundColor: theme.palette.grey[200] }
            }}
            onClick={handleLangMenuClickInDrawer}>
            <Tooltip title={t('nav.changeLang')} placement="left">
              <LanguageIcon />
            </Tooltip>
          </ListItemButton>
          <Menu
            id="language-menu"
            aria-labelledby="language-button"
            anchorEl={anchorForDrawer}
            open={openAnchorInDrawer}
            onClose={handleLangMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            {locales.map((lang) => (
              <MenuItem
                key={lang}
                onClick={() => {
                  handleLangChange(lang)
                  setDrawerOpen(false)}
                }>
                {lang}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {user &&
          <ListItemButton sx={{
            mx: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'inherit',
            transition: 'all 0.2s ease-in-out',
            borderRadius: 3,
            '&:hover': { backgroundColor: theme.palette.grey[200] }
          }}
          onClick={() => handleSignOut()}>
            <Tooltip title={t('nav.signout')} placement="left">
              <LogoutIcon />
            </Tooltip>
          </ListItemButton>
        }
      </List>
    </Box>
  )

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
        <Container maxWidth='sm'>
          <Paper elevation={1}>
            <Toolbar sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgb(255, 255, 255)',
              backdropFilter: 'blur(20px)',
              borderRadius: 3,
              maxHeight: 40,
              boxShadow: '0 0 10px rgb(255, 255, 255)'
            }}>

              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                {navItems.map((item, index) => {
                  const to = routes[item]
                  const isActive = location.pathname === to
                  return (
                    <Link key={index} to={to} style={{ textDecoration: 'none', margin: '0 .5rem' }}>
                      <Button disableRipple key={item} sx={{
                        color: isActive ? 'primary.main' : 'black',
                        textTransform: 'capitalize',
                        borderRadius: 3,
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': { backgroundColor: theme.palette.grey[200] } }}>
                        {item}
                      </Button>
                    </Link>
                  )
                })}
              </Box>

              <IconButton disableRipple sx={{ color: 'black', display: { xs: 'none', md: 'block' }, fontSize: 5 }} onClick={handleLangMenuClick}>
                <Tooltip title={t('nav.changeLang')} placement="bottom">
                  <LanguageIcon />
                </Tooltip>
              </IconButton>
              <Menu
                id="language-menu"
                aria-labelledby="language-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleLangMenuClose}
              >
                {locales.map((lang) => (
                  <MenuItem key={lang} onClick={() => handleLangChange(lang)}>{lang}</MenuItem>
                ))}
              </Menu>

              {user &&
              <IconButton disableRipple sx={{ color: 'black', display: { xs: 'none', md: 'block' }, fontSize: 5 }} onClick={handleSignOut}>
                <Tooltip title={t('nav.signout')} placement="right">
                  <LogoutIcon />
                </Tooltip>
              </IconButton>
              }

              <IconButton
                disableRipple
                onClick={handleDrawerOpen}
                sx={{
                  color: 'primary.dark',
                  display: { xs: 'block', md: 'none' }
                }}>
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Paper>
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
            '& .MuiBackdrop-root': { backdropFilter: 'blur(5px)' },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </div>
  )
}

export default Navigation