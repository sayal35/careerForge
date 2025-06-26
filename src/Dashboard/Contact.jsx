import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate("/");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Contact Page</h1>
      <p className="mt-2">You can reach us at contact@example.com.</p>
      <button
        onClick={handleDashboardClick}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
      >
        Go to dashboard
      </button>
    </div>
  );
};

export default Contact;
