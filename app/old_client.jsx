import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/game';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  ReactDOM.render(<Game />, app);
});
