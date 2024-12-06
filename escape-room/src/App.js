import React from 'react';
import { ThemeProvider } from './ThemeContext';
import AppRouter from './Router'; // 수정된 Router.js

const App = () => {
  return (
    <ThemeProvider>
      <AppRouter /> {/* AppRouter로 변경 */}
    </ThemeProvider>
  );
};

export default App;
