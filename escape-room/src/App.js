import React from "react";
import { ThemeProvider } from "./ThemeContext";
import AppRouter from "./Router"; // 수정된 Router.js
import { RecoilRoot } from "recoil";

const App = () => {
  return (
    <ThemeProvider>
      <RecoilRoot>
        <AppRouter /> {/* AppRouter로 변경 */}
      </RecoilRoot>
    </ThemeProvider>
  );
};

export default App;
