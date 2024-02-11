import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import img from '../assets/large.jpg';
import Features from './Features';
import Typed from 'typed.js';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const Home = () => {
  //const el = React.useRef(null);
  //
  //React.useEffect(() => {
  //  const typed = new Typed(el.current, {
  //    strings: ['CS Student', 'Martial Artist',],
  //    typeSpeed: 100,
  //    backSpeed: 100,
  //    backDelay: 1000,
  //    loop: true
  //  });
  //}, []);
  
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

          <Link to='/login' style={{ textDecoration: 'none' }}>
            <Button variant='contained' size='large'>sign up</Button>
          </Link>
        </Box>
      </Box>
      <Features />
    </>
  );
}; 

export default Home;