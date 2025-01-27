import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Loading = lazy(() => import("./pages/Loading"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const KakaoLoginPage = lazy(() => import("./pages/KakaoLogin"));
const MyPage = lazy(() => import("./pages/MyPage"));
const TierPage = lazy(() => import("./pages/TierPage"));
const ThemePage = lazy(() => import("./pages/ThemePage"));

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/oauth/kakao" element={<KakaoLoginPage />} />
          <Route path="/main" element={<ThemePage />} />
          <Route path="/tier" element={<TierPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
