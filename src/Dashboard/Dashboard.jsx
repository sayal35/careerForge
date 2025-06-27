import FirestoreTest from "../components/TestFirestore";
import DashboardInfo from "./DashboardInfo";

import JobListWithDetails from "./JobListWithDetails";

const Dashboard = () => {
  return (
    <>
      <DashboardInfo />
      <JobListWithDetails />
      <FirestoreTest />
    </>
  );
};

export default Dashboard;
