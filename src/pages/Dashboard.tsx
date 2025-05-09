import MobileUpdateForm from "../components/dashboard/MobileUpdateForm";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";

function Dashboard() {
  const { auth } = useAuth(); // Get authenticated user info from context
  const signout = useLogout(); // Custom hook to handle logout functionality
  return (
    <div className="min-w-full min-h-screen bg-[#F3F4F6] flex items-center flex-col pt-20">
      {/* Logout button positioned at top-right */}
      <div className="absolute top-4 right-4">
        <button
          className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700"
          onClick={signout}
        >
          Logout
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl text-center">
        <h2 className="text-2xl font-bold mb-2">Welcome {auth?.name}</h2>
        {/* Form to update the user's mobile number */}
        <MobileUpdateForm mobile={auth?.mobile} />
      </div>
    </div>
  );
}

export default Dashboard;
