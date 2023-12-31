import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useDispatch, useSelector } from "react-redux";
import { ProtectedRoute } from "protected-route-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getMyProfile } from "./apis/auth";
import HomePage from "./components/home/HomePage";
import SignUpPage from "./components/auth/signup/SignUp";
import LoginPage from "./components/auth/login/LoginPage";
import { loadUser } from "./redux/slices/userSlice";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const {
    data,
    error,
    isPending,
    isLoading: userLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getMyProfile,
    refetchOnWindowFocus: false,
    staleTime: 10 * 1000,
  });

  useEffect(() => {
    if (data && isSuccess) {
      dispatch(loadUser(data.data?.user));
    }
    if (error) {
      if (error.message === "Network Error") {
        toast.error("Network Error");
      } else if (error.response?.data?.error !== "Not Logged In!") {
        toast.error(error?.response?.data?.error);
      }
    }
  }, [data, error, isSuccess]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} redirect="/login">
              <HomePage
                isAuthenticated={isAuthenticated}
                user={user}
                userLoading={false}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/">
              <SignUpPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/">
              <LoginPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster position="bottom-center" reverseOrder={false} />
      <ReactQueryDevtools buttonPosition="bottom-left" />
    </Router>
  );
}

export default App;
