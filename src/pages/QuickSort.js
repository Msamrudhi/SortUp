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

const QuickSort = () => {
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

  const quickSort = async (arr, low, high) => {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
  };

  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      setHighlightedIndices([j, high]);
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await new Promise(resolve => setTimeout(resolve, 1000 / speed));
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await new Promise(resolve => setTimeout(resolve, 1000 / speed));
    return i + 1;
  };

  const handleQuickSort = async () => {
    setSorting(true);
    const arr = [...array];
    await quickSort(arr, 0, arr.length - 1);
    setHighlightedIndices([]);
    setSorting(false);
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(to bottom right, #fce4ec, #f8bbd0)' }}>
      <AppBar position="static" sx={{ backgroundColor: '#c85c8e', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#FDFFD2' }}>
            Quick Sort Visualization
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
            <GradientButton onClick={handleQuickSort} disabled={sorting}>Start</GradientButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ textAlign: 'center', padding: '20px'
      }}>
      <Grid container spacing={2} justifyContent="center" alignItems="flex-end">
        {array.map((value, index) => (
          <Grid item key={index}>
            <Box
              sx={{
                height: `${value * 4}px`,
                width: '30px',
                background: highlightedIndices.includes(index)
                  ? 'linear-gradient(to top, #FF0000, #ea98a3)'
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

export default QuickSort;
