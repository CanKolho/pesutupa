import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import GoogleIcon from '@mui/icons-material/Google'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/userContext'

const Login = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState(false)
  const [helperTextEmail, setHelperTextEmail] = React.useState('')
  const [helperTextPassword, setHelperTextPassword] = React.useState('')
  const navigate = useNavigate()
  const { loginWithEmailAndPassword, signUpWithGoogle } = useUser()

  const handleSignIn = async (event) => {
    event.preventDefault()
    try {
      await loginWithEmailAndPassword(email, password)
      navigate('/reservations')
    } catch (error) {
      setError(true)
      setHelperTextEmail('Please check your email address')
      setHelperTextPassword('Please check your password')
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.light' }}><LockOutlinedIcon /></Avatar>
        <Typography component="h1" variant="h5">Sign in</Typography>
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
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSignIn}
          >
            Sign In
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ mt: 1, mb: 2 }}
            onClick={handleGoogleSignIn}
          >
            <GoogleIcon />
            <Typography variant="button" sx={{ ml: 1 }}>
              Sign In with Google
            </Typography>
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {'Don\'t have an account? Sign Up'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Login