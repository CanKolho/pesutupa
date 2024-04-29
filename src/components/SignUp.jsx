import { useState } from 'react'
import { Box } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MuiLink from '@mui/material/Link'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/userContext'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'

const strengthLabes = [
  'signup.passwordStrength.weak',
  'signup.passwordStrength.medium',
  'signup.passwordStrength.good',
  'signup.passwordStrength.strong'
]

// TODO: translation namespace siistimmäksi

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [helperTextEmail, setHelperTextEmail] = useState('')
  const [helperTextPassword, setHelperTextPassword] = useState('')
  const [passwordStrength, setPasswordStrength] = useState('')
  const navigate = useNavigate()
  const { signUpWithEmailAndPassword } = useUser()
  const theme = useTheme()
  const { t } = useTranslation()

  const checkPasswordStrength = (password) => {
    let strength = -1
    if (password.match(/[a-z]+/)) strength++
    if (password.match(/[A-Z]+/)) strength++
    if (password.match(/[0-9]+/)) strength++
    if (password.match(/[$@#&!]+/)) strength++
    if (password.length > 12) strength++

    return strengthLabes[strength]
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
    setPasswordStrength(checkPasswordStrength(event.target.value))
  }

  const handleSignUp = async (event) => {
    event.preventDefault()
    try {
      await signUpWithEmailAndPassword(email, password)
      navigate('/reservations')
    } catch (error) {
      setError(true)
      setHelperTextEmail('Please check your email address')
      setHelperTextPassword('Please check your password')
    }
  }

  const getPasswordStrengthStyle = () => {
    switch (t(passwordStrength)) {
    case t('signup.passwordStrength.weak'):
      return { bgcolor: 'error.main', width: '25%' }
    case t('signup.passwordStrength.medium'):
      return { bgcolor: 'warning.light', width: '50%' }
    case t('signup.passwordStrength.good'):
      return { bgcolor: 'success.light', width: '75%' }
    case t('signup.passwordStrength.strong'):
      return { bgcolor: 'success.main', width: '100%' }
    default:
      return { width: '0%' }
    }
  }

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 15 }}>
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}><AccountCircleIcon /></Avatar>
        <Typography component="h1" variant="h5">{t('signup.title')}</Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            value={email}
            id="email"
            label={t('signup.email')}
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
            label={t('signup.password')}
            type="password"
            id="password"
            error={error}
            helperText={helperTextPassword}
            autoComplete="current-password"
            onChange={(event) => handlePasswordChange(event)}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
            <Box sx={{ backgroundColor: theme.palette.grey[200], width: '100%',height: 6, borderRadius: 2 }}>
              <Box sx={{ ...getPasswordStrengthStyle(), height: '100%', transition: '.4s' }} />
            </Box>
            {passwordStrength &&
              <Typography gutterBottom>
                {t('signup.pwStrength')}{': '} {t(passwordStrength)}
              </Typography>}
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, textTransform: 'capitalize' }}
            onClick={handleSignUp}
          >
            {t('signup.button')}
          </Button>
          <Grid container>
            <Grid item>
              <Link to='/signin' style={{ textDecoration: 'none', color: 'black' }}>
                <MuiLink variant="body2">{t('signup.links.login')}</MuiLink>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default SignUp