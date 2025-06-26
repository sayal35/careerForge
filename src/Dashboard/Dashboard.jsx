import { useNavigate } from "react-router-dom";
import DashboardInfo from "./DashboardInfo";

import JobListWithDetails from "./JobListWithDetails";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <>
      <DashboardInfo />
      <JobListWithDetails />
      <div className="p-4 min-h-[200vh] bg-gray-50">
        {/* You can also use "min-h-screen" if you want at least full height */}
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleContactClick}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
        >
          Go to Contact Page
        </button>

        {/* Dummy content to simulate scroll */}
        <div className="mt-10 space-y-4">
          {[...Array(50)].map((_, i) => (
            <p key={i} className="text-gray-700">
              Scroll content line #{i + 1}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
