import React, { useEffect } from "react";
import { ThemeProvider } from "./ThemeContext";
import AppRouter from "./Router"; // 수정된 Router.js
import { RecoilRoot, useSetRecoilState } from "recoil";
import { tokenState, refreshTokenState } from "./store/atom";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

// ✅ 토큰 복원용 컴포넌트
const TokenInitializer = () => {
  const setAccessToken = useSetRecoilState(tokenState);
  const setRefreshToken = useSetRecoilState(refreshTokenState);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (storedAccessToken) setAccessToken(storedAccessToken);
    if (storedRefreshToken) setRefreshToken(storedRefreshToken);
  }, [setAccessToken, setRefreshToken]);

  return null; // 렌더링은 필요 없음
};

const App = () => {
  return (
    <ThemeProvider>
      <RecoilRoot>
        <TokenInitializer /> {/* ✅ 새로고침 시 토큰 복원 */}
        <AppRouter />
      </RecoilRoot>
    </ThemeProvider>
  );
};

export default App;