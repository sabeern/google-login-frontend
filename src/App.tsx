import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { GoogleOAuthProvider } from "@react-oauth/google";
import RequireAuth from "./components/login/RequireAuth";
import PersistanceLogin from "./components/login/PersistanceLogin";
import { ToastContainer } from "react-toastify";
import NotFound from "./pages/NotFound";

function App() {
  const GoogleWrapper = () => (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Login />
    </GoogleOAuthProvider>
  );
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Routes that persist across refresh */}
          <Route element={<PersistanceLogin />}>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<GoogleWrapper />} />

            {/* Protected Routes */}
            <Route element={<RequireAuth />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
