// src/App.js
import React, { useEffect } from "react";
import { ThemeProvider } from "./ThemeContext";
import AppRouter from "./Router";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { tokenState, refreshTokenState } from "./store/atom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// ✅ React Query Client 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5분 캐싱
      cacheTime: 10 * 60 * 1000, // 10분 캐시 유지
      refetchOnWindowFocus: false,
      retry: 2, // 실패 시 2회 재시도
    },
  },
});

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

  return null;
};

const App = () => {
  return (
    <ThemeProvider>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <TokenInitializer />
          <AppRouter />
          {/* ✅ 개발 환경에서만 DevTools 활성화 */}
          {process.env.NODE_ENV === "development" && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </QueryClientProvider>
      </RecoilRoot>
    </ThemeProvider>
  );
};

export default App;