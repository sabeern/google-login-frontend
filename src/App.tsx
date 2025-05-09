import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { GoogleOAuthProvider } from "@react-oauth/google";
import RequireAuth from "./components/login/RequireAuth";
import PersistanceLogin from "./components/login/PersistanceLogin";

function App() {
  const GoogleWrapper = () => (
    <GoogleOAuthProvider clientId="655411774165-at0rks522f2btc89rgda57qo7dsgkbhb.apps.googleusercontent.com">
      <Login />
    </GoogleOAuthProvider>
  );
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes that persist across refresh */}
        <Route element={<PersistanceLogin />}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<GoogleWrapper />} />

          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
