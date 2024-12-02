import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Loading = lazy(() => import("./pages/Loading"));
const MainPage = lazy(() => import("./pages/MainPage"));

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
