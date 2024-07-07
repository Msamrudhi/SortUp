import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import InsertionSort from './pages/InsertionSort';
import SelectionSort from './pages/SelectionSort';
import BubbleSort from './pages/BubbleSort';
import QuickSort from './pages/QuickSort';
import MergeSort from './pages/MergeSort';
import ShellSort from './pages/ShellSort';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/insertionsort" element={<InsertionSort />} />
        <Route path="/selectionsort" element={<SelectionSort />} />
        <Route path="/bubblesort" element={<BubbleSort />} />
        <Route path="/quicksort" element={<QuickSort />} />
        <Route path="/mergesort" element={<MergeSort />} />
        <Route path="/shellsort" element={<ShellSort />} />
      </Routes>
    </Router>
  );
}

export default App;
