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
    </>
  );
};

export default Dashboard;
