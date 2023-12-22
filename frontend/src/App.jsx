import LoginPage from "../components/auth/login/LoginPage";
import SignUpPage from "../components/auth/signup/Signup";
import Home from "../components/home/HomePage";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useDispatch, useSelector } from "react-redux";
import { ProtectedRoute } from "protected-route-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMyProfile } from "../apis/auth";
import { useEffect } from "react";
import { loadUser } from "../redux/slices/userSlice";
import Cookies from "js-cookie";

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
            <Home
              isAuthenticated={isAuthenticated}
              user={user}
              userLoading={userLoading}
            />
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
