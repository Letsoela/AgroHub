import React, { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import LoginPage from "./components/auth/LoginPage";
import FeedPage from "./components/feed/FeedPage";
import routes from "tempo-routes";

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/feed" /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/feed" /> : <LoginPage />}
        />
        <Route
          path="/feed"
          element={isAuthenticated ? <FeedPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/farmer/*"
          element={
            isAuthenticated ? (
              <Home initialUserRole="farmer" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/distributor/*"
          element={
            isAuthenticated ? (
              <Home initialUserRole="distributor" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/retailer/*"
          element={
            isAuthenticated ? (
              <Home initialUserRole="retailer" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/consumer/*"
          element={
            isAuthenticated ? (
              <Home initialUserRole="consumer" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        {import.meta.env.VITE_TEMPO === "true" && <Route path="/tempobook/*" />}
      </Routes>
    </Suspense>
  );
}

export default App;
