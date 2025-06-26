import React from "react";

const DashboardInfo = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 shadow-xl p-8 md:p-12 mb-8 mt-0">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Section: Introduction */}
        <div className="md:w-1/2 w-full">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 leading-tight">
            Welcome to <span className="text-blue-600">CareerForge</span>
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            CareerForge is a premier job portal dedicated to connecting job
            seekers with the best career opportunities in Dubai. Whether you're
            a fresh graduate, seasoned professional, or planning a career shift,
            we help you find the right job to match your passion and potential.
          </p>
          <div className="flex justify-end">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition duration-300 shadow-md">
              Explore Jobs
            </button>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="md:w-1/2 w-full flex justify-center">
          <img
            src="/jobhire.jpg"
            alt="Career Opportunity"
            className="rounded-2xl max-w-xs md:max-w-sm shadow-lg transform hover:scale-105 transition duration-500"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardInfo;
