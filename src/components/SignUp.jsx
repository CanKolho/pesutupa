import { useState } from 'react'
import { Box } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/userContext'

const strengthLabes = ['Weak', 'Medium', 'Good', 'Strong']

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [helperTextEmail, setHelperTextEmail] = useState('')
  const [helperTextPassword, setHelperTextPassword] = useState('')
  const [passwordStrength, setPasswordStrength] = useState('')
  const navigate = useNavigate()
  const { signUpWithEmailAndPassword } = useUser()

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
    switch (passwordStrength) {
    case 'Weak':
      return { bgcolor: 'error.main', width: '25%' }
    case 'Medium':
      return { bgcolor: 'warning.light', width: '50%' }
    case 'Good':
      return { bgcolor: 'success.light', width: '75%' }
    case 'Strong':
      return { bgcolor: 'success.main', width: '100%' }
    default:
      return { width: '0%' }
    }
  }

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 15 }}>
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.light' }}><AccountCircleIcon /></Avatar>
        <Typography component="h1" variant="h5">Sign Up</Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            value={email}
            id="email"
            label="Email Address"
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
            label="Password"
            type="password"
            id="password"
            error={error}
            helperText={helperTextPassword}
            autoComplete="current-password"
            onChange={(event) => handlePasswordChange(event)}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
            <Box sx={{
              ...getPasswordStrengthStyle(),
              display: 'flex',
              alignItems: 'center',
              my: 1,
              height: 6,
              borderRadius: 1,
              transition: '.4s',
            }}>
            </Box>
            {passwordStrength && (
              <Typography gutterBottom>
                Password strength: {passwordStrength}
              </Typography>
            )}
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2">
                {'Already have an account? Sign In'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default SignUp