import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Loading = lazy(() => import("./pages/Loading"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const MyPage = lazy(() => import("./pages/MyPage"));

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/main" element={<MyPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
