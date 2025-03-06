import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Loading = lazy(() => import("./pages/Loading"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const KakaoLoginPage = lazy(() => import("./pages/KakaoLogin"));
const MyPage = lazy(() => import("./pages/MyPage"));
const TierPage = lazy(() => import("./pages/TierPage"));
const ThemePage = lazy(() => import("./pages/ThemePage"));
const Detail = lazy(() => import("./pages/Detail"));
const MyDetailPage = lazy(() => import("./pages/MyDetailPage"));

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/oauth/kakao" element={<KakaoLoginPage />} />
          <Route path="/main" element={<ThemePage />} />
          <Route path="/tier" element={<TierPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/mydetailpage" element={<MyDetailPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
