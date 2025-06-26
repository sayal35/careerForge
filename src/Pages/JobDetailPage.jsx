import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const jobs = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    salary: "$80,000 - $120,000",
    content:
      "Software engineers design, develop, test, and maintain software applications and systems. They write clean and efficient code and collaborate with cross-functional teams.",
    image: "https://via.placeholder.com/300x200?text=Software+Engineer",
    positions: 5,
    benefits: [
      "Flexible working hours",
      "Remote work options",
      "Health insurance",
      "Learning & development budget",
    ],
    applicationLink:
      "mailto:careers@example.com?subject=Application for Software Engineer",
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    salary: "$60,000 - $90,000",
    content:
      "UI/UX designers focus on the look and feel of applications, ensuring an intuitive and engaging user experience. They create wireframes, prototypes, and design systems.",
    image: "https://via.placeholder.com/300x200?text=UI%2FUX+Designer",
    positions: 2,
    benefits: [
      "Creative work culture",
      "Stock options",
      "Paid vacations",
      "MacBook & design tools",
    ],
    applicationLink:
      "mailto:careers@example.com?subject=Application for UI/UX Designer",
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    salary: "$55,000 - $85,000",
    content:
      "Data analysts collect, process, and perform statistical analyses on data. They help organizations make informed decisions by interpreting data trends and generating reports.",
    image: "https://via.placeholder.com/300x200?text=Data+Analyst",
    positions: 3,
    benefits: [
      "Professional development",
      "Work-from-home allowance",
      "Team outings",
      "Performance bonuses",
    ],
    applicationLink:
      "mailto:careers@example.com?subject=Application for Data Analyst",
  },
];

const JobDetailPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const job = jobs.find((job) => job.id === jobId);

  return (
    <div className="w-full px-6 space-y-8 pt-5">
      <button
        onClick={() => navigate("/")}
        className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
      >
        ← Back
      </button>

      {/* Job Overview Section - Content Left, Image Right */}
      <div className="flex flex-col md:flex-row gap-6 items-start bg-white p-4 rounded-lg shadow">
        {/* Left Content */}
        <div className="md:w-1/2 space-y-4 text-left">
          <h1 className="text-4xl font-bold">{job.title}</h1>
          <p className="text-xl font-semibold text-gray-700">
            Salary Range: {job.salary}
          </p>
          <p className="text-gray-700">{job.content}</p>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={job.image}
            alt={job.title}
            className="rounded shadow max-w-full h-auto"
            loading="lazy"
          />
        </div>
      </div>
      <section className="bg-white p-6 rounded-lg shadow space-y-2">
        <h2 className="text-2xl font-semibold mb-2">Why Work Here?</h2>
        <p className="text-gray-700">
          At our company, you'll work in a supportive and innovative environment
          where your growth matters. We believe in collaboration, transparency,
          and delivering high-quality solutions that make real impact.
        </p>
      </section>

      <section className="bg-white p-6 rounded-lg shadow space-y-2">
        <h2 className="text-2xl font-semibold mb-2">Available Positions</h2>
        <p className="text-gray-700">
          Currently hiring: <strong>{job.positions}</strong> position(s)
        </p>
      </section>

      <section className="bg-white p-6 rounded-lg shadow space-y-2">
        <h2 className="text-2xl font-semibold mb-2">Salary and Benefits</h2>
        <p className="text-gray-700 mb-2">
          Offered Salary: <strong>{job.salary}</strong>
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {job.benefits.map((benefit, idx) => (
            <li key={idx}>{benefit}</li>
          ))}
        </ul>
      </section>

      <section className="bg-white p-6 rounded-lg shadow space-y-2">
        <h2 className="text-2xl font-semibold mb-2">How to Apply</h2>
        <p className="text-gray-700 mb-2">
          To apply, please send your updated resume and portfolio to our hiring
          team. Make sure to include the job title in the subject line.
        </p>
        <a
          href={job.applicationLink}
          className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Apply Now
        </a>
      </section>

      <section className="bg-white p-6 rounded-lg shadow space-y-2 mb-5">
        <h2 className="text-2xl font-semibold mb-2">Final Thoughts</h2>
        <p className="text-gray-700">
          We are looking for passionate individuals who are eager to grow and
          make a difference. If you think you are the right fit, we encourage
          you to apply today and become part of our journey!
        </p>
      </section>
    </div>
  );
};

export default JobDetailPage;
