import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import img from '../assets/large.jpg'
import Features from './Features'
import { Link } from 'react-router-dom'
import { useUser } from '../context/userContext'
import { useTranslation } from 'react-i18next'

const Home = () => {
  const { user, logout } = useUser()
  const { t } = useTranslation()

  return (
    <>
      <Box sx={{
        height: '75vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4)), url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom 20%',
      }} >

        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(38, 41, 55, 0.5)',
          backdropFilter: 'blur(20px)',
          width: '100%',
          height: '12%',
          alignSelf: 'flex-end'
        }}>

          {!user ?
            <Link to='/signin' style={{ textDecoration: 'none' }}>
              <Button variant='contained' size='large'>{t('nav.signin')}</Button>
            </Link>
            :
            <Button variant='contained' size='large' color='warning' onClick={logout}>{t('nav.signout')}</Button>
          }
        </Box>
      </Box>
      <Features />
    </>
  )
}

export default Home