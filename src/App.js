import React from 'react';
import TableComponent from './components/tableComponent';
import './App.css';

function App() {
  return (
    <TableComponent initialWidth={4} initialHeight={4} cellSize={50}/>
  );
}

export default App;
