import * as React from 'react'
import { Box } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MuiLink from '@mui/material/Link'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import GoogleIcon from '@mui/icons-material/Google'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/userContext'
import { useTranslation } from 'react-i18next'

const Login = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState(false)
  const [helperTextEmail, setHelperTextEmail] = React.useState('')
  const [helperTextPassword, setHelperTextPassword] = React.useState('')
  const navigate = useNavigate()
  const { loginWithEmailAndPassword, signUpWithGoogle } = useUser()
  const { t } = useTranslation()

  const handleSignIn = async (event) => {
    event.preventDefault()
    try {
      await loginWithEmailAndPassword(email, password)
      navigate('/reservations')
    } catch (error) {
      setError(true)
      setHelperTextEmail(t('login.error.email'))
      setHelperTextPassword(t('login.error.password'))
    }
  }

  const handleGoogleSignIn = async (event) => {
    event.preventDefault()
    try {
      await signUpWithGoogle()
      navigate('/reservations')
    } catch (error) {
      console.log('Google login error:', error)
    }
  }

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 15 }}>
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}><LockOutlinedIcon /></Avatar>
        <Typography component="h1" variant="h5">{t('nav.signin')}</Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            value={email}
            id="email"
            label={t('login.email')}
            name="email"
            autoComplete="email"
            autoFocus
            error={error}
            helperText={helperTextEmail}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={password}
            name="password"
            label={t('login.password')}
            type="password"
            id="password"
            error={error}
            helperText={helperTextPassword}
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, textTransform: 'capitalize' }}
            onClick={handleSignIn}
          >
            {t('nav.signin')}
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ mt: 1, mb: 2 }}
            onClick={handleGoogleSignIn}
          >
            <GoogleIcon />
            <Typography variant="button" sx={{ ml: 1, textTransform: 'capitalize' }}>
              {t('login.google')}
            </Typography>
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='#' style={{ textDecoration: 'none', color: 'black' }}>
                <MuiLink variant="body2">{t('login.links.reset')}</MuiLink>
              </Link>
            </Grid>
            <Grid item>
              <Link to='/signup' style={{ textDecoration: 'none', color: 'black' }}>
                <MuiLink variant="body2">{t('login.links.signup')}</MuiLink>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Login