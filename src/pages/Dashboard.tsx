import useAuth from "../hooks/useAuth";

function Dashboard() {
  const { auth } = useAuth();

  return (
    <div className="min-w-full min-h-screen bg-[#F3F4F6] flex items-center flex-col pt-20">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl text-center">
        <h2 className="text-2xl font-bold mb-2">Welcome {auth?.name}</h2>
        <p className="text-gray-700">
          Note: Please enter your mobile number for getting Google event
          notifications.
        </p>
        <div className="mt-4 flex flex-row gap-2 items-center justify-center">
          <label htmlFor="mobile">Mobile</label>
          <input type="text" className="p-1 border-2 rounded" />
        </div>
        <div className="mt-4">
          <button className="border-2 border-blue-700 text-white px-4 py-2 rounded bg-blue-700 hover:bg-white hover:text-black font-semibold">
            Add Mobile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
