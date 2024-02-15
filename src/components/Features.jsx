import DevicesIcon from '@mui/icons-material/Devices'
import LanguageIcon from '@mui/icons-material/Language'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useMediaQuery } from '@mui/material'

const Features = () => {
  const isMobile = useMediaQuery('(max-width: 800px)')

  const features = [

    {
      icon: <DevicesIcon color='primary' sx={{ fontSize: '3rem' }}/>,
      title: 'Responsive',
      description: 'Compatible on any screen size!'
    },
    {
      icon: <LanguageIcon color='primary' sx={{ fontSize: '3rem' }}/>,
      title: 'Language Support',
      description: 'Available in multiple languages! (fi, en, sv)'
    },
    {
      icon: <TrendingUpIcon color='primary' sx={{ fontSize: '3rem' }}/>,
      title: 'Easy to use',
      description: 'Manage reservations easily!'
    }
  ]

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 3,
      mt: 7
    }}>
      {features.map((feature, index) => (
        <Box key={index} sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
          padding: 2,
          maxWidth: 300,
          margin: '0 auto',
        }}>
          {feature.icon}
          <Typography variant='h5'>{feature.title}</Typography>
          <Typography variant='body1'>{feature.description}</Typography>
        </Box>
      ))}
    </Box>
  )
}

export default Features