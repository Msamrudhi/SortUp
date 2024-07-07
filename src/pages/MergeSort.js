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

const MergeSort = () => {
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

  const mergeSort = async (arr, left, right) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await mergeSort(arr, left, mid);
      await mergeSort(arr, mid + 1, right);
      await merge(arr, left, mid, right);
    }
  };

  const merge = async (arr, left, mid, right) => {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    const leftArray = Array(n1).fill(0);
    const rightArray = Array(n2).fill(0);

    for (let i = 0; i < n1; i++) leftArray[i] = arr[left + i];
    for (let j = 0; j < n2; j++) rightArray[j] = arr[mid + 1 + j];

    let i = 0,
      j = 0,
      k = left;

    while (i < n1 && j < n2) {
      setHighlightedIndices([left + i, mid + 1 + j]);
      await new Promise(resolve => setTimeout(resolve, 1000 / speed));
      if (leftArray[i] <= rightArray[j]) {
        arr[k] = leftArray[i];
        i++;
      } else {
        arr[k] = rightArray[j];
        j++;
      }
      k++;
      setArray([...arr]);
    }

    while (i < n1) {
      arr[k] = leftArray[i];
      i++;
      k++;
      setArray([...arr]);
      await new Promise(resolve => setTimeout(resolve, 1000 / speed));
    }

    while (j < n2) {
      arr[k] = rightArray[j];
      j++;
      k++;
      setArray([...arr]);
      await new Promise(resolve => setTimeout(resolve, 1000 / speed));
    }
  };

  const handleMergeSort = async () => {
    setSorting(true);
    const arr = [...array];
    await mergeSort(arr, 0, arr.length - 1);
    setHighlightedIndices([]);
    setSorting(false);
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(to bottom right, #fce4ec, #f8bbd0)' }}>
      <AppBar position="static" sx={{ backgroundColor: '#c85c8e', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#FDFFD2' }}>
            Merge Sort Visualization
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
            <GradientButton onClick={handleMergeSort} disabled={sorting}>Start</GradientButton>
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

export default MergeSort;
