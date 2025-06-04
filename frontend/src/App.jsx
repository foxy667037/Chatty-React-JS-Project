import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Routes, Route } from "react-router";
import { useAuthStore } from "./store/useAuthStore.js";
import SimpleLoader from "./components/SimpleLoader.jsx";

import HomePage from "./pages/home/HomePage.jsx";

import LoginPage from "./pages/auth/LoginPage.jsx";
import SignUpPage from "./pages/auth/SignUpPage.jsx";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage.jsx";

import NotFoundPage from "./pages/error/NotFoundPage.jsx";

import ProfilePage from "./pages/ProfilePage.jsx";
import ReportPage from "./pages/ReportPage.jsx";
import SettingPage from "./pages/SettingPage.jsx";

const App = () => {
  const {
    authUser,
    checkAuth,
    isCheckingAuth,
    getAllUsers,
    allUsers,
    getUserActivities,
    authUserActivity
  } = useAuthStore();

  useEffect(() => {
    checkAuth();
    getAllUsers();
    getUserActivities();
  }, [checkAuth, getAllUsers, getUserActivities]);

  console.log({ User: authUser });
  console.log({ allUser: allUsers });
  console.log({ UserActivity: authUserActivity });

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <SimpleLoader />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/setting"
          element={authUser ? <SettingPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/report"
          element={authUser ? <ReportPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/forgot-password"
          element={!authUser ? <ForgotPasswordPage /> : <Navigate to="/" />}
        />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
