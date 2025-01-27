import React from "react";
import { ThemeProvider } from "./ThemeContext";
import AppRouter from "./Router"; // 수정된 Router.js
import { RecoilRoot } from "recoil";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
