import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Loading = lazy(() => import("./pages/Loading"));
const MyPage = lazy(() => import("./pages/MyPage"));
const TierPage = lazy(() => import("./pages/TierPage"));

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route path="/main" element={<MyPage />} />
          <Route path="/tier" element={<TierPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
