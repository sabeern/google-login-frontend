import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function NotFound() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const navigateToPage = () => {
    if (auth?.accessToken) navigate("/dashboard");
    else navigate("/login");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={navigateToPage}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go to Home
      </button>
    </div>
  );
}

export default NotFound;
