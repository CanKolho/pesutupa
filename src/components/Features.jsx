import DevicesIcon from '@mui/icons-material/Devices'
import LanguageIcon from '@mui/icons-material/Language'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useMediaQuery } from '@mui/material'
import { useTranslation } from 'react-i18next'

const Features = () => {
  const isMobile = useMediaQuery('(max-width: 800px)')
  const { t } = useTranslation()

  const features = [
    {
      icon: <DevicesIcon color='primary' sx={{ fontSize: '3rem' }}/>,
      title: t('home.title1.line1'),
      description: t('home.title1.line2')
    },
    {
      icon: <LanguageIcon color='primary' sx={{ fontSize: '3rem' }}/>,
      title: t('home.title2.line1'),
      description: t('home.title2.line2')
    },
    {
      icon: <TrendingUpIcon color='primary' sx={{ fontSize: '3rem' }}/>,
      title: t('home.title3.line1'),
      description: t('home.title3.line2')
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
          maxWidth: 160,
          margin: '0 auto',
          textAlign: 'center'
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