import { useState } from 'react'
import TextField from '@mui/material/TextField'

const CustomTextField = ({ label, ...props }) => {
  const [error, setError] = useState(false)
  const [helperText, setHelperText] = useState('')

  return (
    <TextField
      required
      margin="normal"
      variant='filled'
      fullWidth
      label={label}
      {...props}
      error={error}
      helperText={helperText}
      onInput={onBlur}
    />
  )
}

export default CustomTextField