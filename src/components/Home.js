import React from 'react';
import { Box, Button, Container, Grid, Typography, AppBar, Toolbar } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/pink.png'; // Update with the correct path to your background image

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(to right, #dc89ce, #ea98a3)',
  color: '#0C2D57',
  borderRadius: '10px',
  padding: '15px',
  fontSize: '1.2rem',
  cursor: 'pointer',
  transition: 'background 0.3s ease, transform 0.3s ease',
  width: '100%',
  '&:hover': {
    background: 'linear-gradient(to right, #FF5580, #ea98a3)',
    transform: 'translateY(-3px)',
  },
}));

const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ 
      flexGrow: 1, 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      backgroundImage: `url(${backgroundImage})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center' 
    }}>
      <AppBar position="static" sx={{ backgroundColor: '#c85c8e', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)' }}>
        <Toolbar sx={{ justifyContent: 'flex-start' }}>
          <Typography variant="h3" component="div" sx={{ color: '#FDFFD2' }}>
            SortUp
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'flex-start', 
        textAlign: 'left', 
        padding: '20px' 
      }}>
        <Typography variant="h4" component="h2" sx={{ color: '#c85c8e', marginBottom: '2rem' }}>
          Sorting Algorithm Visualizations
        </Typography>
        <Grid container spacing={2} maxWidth="md" sx={{ padding: '0 20px' }}>
          <Grid item xs={12} sm={6}>
            <GradientButton onClick={() => handleButtonClick('/insertionsort')}>
              Insertion Sort
            </GradientButton>
          </Grid>
          <Grid item xs={12} sm={6}>
            <GradientButton onClick={() => handleButtonClick('/selectionsort')}>
              Selection Sort
            </GradientButton>
          </Grid>
          <Grid item xs={12} sm={6}>
            <GradientButton onClick={() => handleButtonClick('/bubblesort')}>
              Bubble Sort
            </GradientButton>
          </Grid>
          <Grid item xs={12} sm={6}>
            <GradientButton onClick={() => handleButtonClick('/quicksort')}>
              Quick Sort
            </GradientButton>
          </Grid>
          <Grid item xs={12} sm={6}>
            <GradientButton onClick={() => handleButtonClick('/mergesort')}>
              Merge Sort
            </GradientButton>
          </Grid>
          <Grid item xs={12} sm={6}>
            <GradientButton onClick={() => handleButtonClick('/shellsort')}>
              Shell Sort
            </GradientButton>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
