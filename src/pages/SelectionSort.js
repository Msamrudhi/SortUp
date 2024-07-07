import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Typography, Grid, AppBar, Toolbar, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(to right, #dc89ce, #ea98a3)',
  color: '#0C2D57',
  borderRadius: '10px',
  padding: '10px 20px',
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'background 0.3s ease, transform 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(to right, #FF5580, #ea98a3)',
    transform: 'translateY(-3px)',
  },
}));

const SelectionSort = () => {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [highlightedIndices, setHighlightedIndices] = useState([]);

  useEffect(() => {
    generateRandomArray();
  }, []);

  const generateRandomArray = () => {
    const randomArray = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(randomArray);
  };

  const selectionSort = async () => {
    setSorting(true);
    const arr = [...array];
    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
        setHighlightedIndices([i, minIndex, j]);
        await new Promise(resolve => setTimeout(resolve, 1000 / speed)); // Adjusting delay based on speed
      }
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      setArray([...arr]);
      setHighlightedIndices([i, minIndex]);
      await new Promise(resolve => setTimeout(resolve, 1000 / speed)); // Adjusting delay based on speed
    }
    setHighlightedIndices([]);
    setSorting(false);
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(to bottom right, #fce4ec, #f8bbd0)' }}>
      <AppBar position="static" sx={{ backgroundColor: '#c85c8e', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#FDFFD2' }}>
            Selection Sort Visualization
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Typography variant="body1" sx={{ color: '#FDFFD2' }}>
              Speed:
            </Typography>
            <Select
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              sx={{ color: '#FDFFD2', backgroundColor: '#c85c8e' }}
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: '#c85c8e',
                  },
                },
              }}
            >
              <MenuItem value={1}>1x</MenuItem>
              <MenuItem value={2}>2x</MenuItem>
              <MenuItem value={3}>3x</MenuItem>
            </Select>
            <GradientButton onClick={generateRandomArray} disabled={sorting}>Randomize</GradientButton>
            <GradientButton onClick={selectionSort} disabled={sorting}>Start</GradientButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ textAlign: 'center', padding: '20px' }}>
        <Grid container spacing={2} justifyContent="center" alignItems="flex-end">
          {array.map((value, index) => (
            <Grid item key={index}>
              <Box
                sx={{
                  height: `${value * 4}px`, // Increase bar height
                  width: '30px', // Increase bar width
                  background: highlightedIndices.includes(index)
                    ? 'linear-gradient(to top, #FF0000, #ea98a3)' // Highlight color
                    : 'linear-gradient(to top, #FF5580, #ea98a3)',
                  borderRadius: '5px',
                  textAlign: 'center',
                  color: '#FFF',
                }}
              >
                {value}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SelectionSort;
