import React from 'react';
import { ThemeProvider } from './ThemeContext';
import Router from './Router'; // Router.js를 불러옵니다.

const App = () => {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
};

export default App;
