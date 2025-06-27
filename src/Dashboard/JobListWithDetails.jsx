import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { mockJobs } from "../assets/jobsData";
import Features from "../components/Features";

const JobListWithDetails = () => {
  const jobRefs = useRef({});
  const navigate = useNavigate();

  // ✅ Transform jobsData to only include relevant fields
  const jobs = mockJobs.map((job) => ({
    id: job.id,
    title: job.title,
    salary: job.salary,
    content: job.description,
    image: job.image,
  }));

  const sectionColors = [
    "bg-blue-50",
    "bg-green-50",
    "bg-yellow-50",
    "bg-pink-50",
    "bg-purple-50",
    "bg-indigo-50",
    "bg-teal-50",
  ];

  const handleClick = (id) => {
    const element = jobRefs.current[id];
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full p-6 space-y-12 text-left bg-gray-50">
      {/* Job List Table */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Job List with Salary
        </h2>
        <table className="min-w-full border-collapse border border-gray-300 mx-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left w-16">
                #
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Job Title
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left w-52">
                Salary
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(({ id, title, salary }, index) => (
              <tr
                key={id}
                onClick={() => handleClick(id)}
                className="cursor-pointer hover:bg-blue-50"
              >
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-blue-700 underline">
                  {title}
                </td>
                <td className="border border-gray-300 px-4 py-2">{salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Features />
      {/* Job Details Sections */}
      <div>
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">
          Your Next Opportunity Starts Here
        </h2>

        {jobs.map(({ id, title, content, image }, index) => (
          <section
            key={id}
            ref={(el) => (jobRefs.current[id] = el)}
            id={id}
            className={`mb-10 flex flex-col md:flex-row items-center gap-8 p-6 rounded-lg shadow ${
              sectionColors[index % sectionColors.length]
            }`}
          >
            {/* Text Content */}
            <div className="md:w-1/2 text-left self-center">
              <h3 className="text-3xl font-bold mb-4">{title}</h3>
              <p className="text-gray-700 whitespace-pre-line">
                {content.repeat(4)}
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    navigate(`/jobs/${id}`);
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
                >
                  Learn More About Job
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="md:w-1/2 flex justify-start">
              <img
                src={image}
                alt={title}
                className="max-w-full rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default JobListWithDetails;
