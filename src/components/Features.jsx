import React from "react";
import {
  FaShieldAlt,
  FaStar,
  FaHandshake,
  FaThumbsUp,
  FaLock,
  FaCheckCircle,
  FaGlobe,
  FaUsers,
} from "react-icons/fa";

const features = [
  {
    icon: <FaShieldAlt />,
    title: "Secure & Trusted",
    desc: "We prioritize safety in all our services.",
  },
  {
    icon: <FaStar />,
    title: "Top Rated",
    desc: "Highly rated by our loyal customer base.",
  },
  {
    icon: <FaHandshake />,
    title: "Reliable Support",
    desc: "Always here when you need us most.",
  },
  {
    icon: <FaThumbsUp />,
    title: "Customer Satisfaction",
    desc: "98% customer happiness score.",
  },
  {
    icon: <FaLock />,
    title: "Privacy First",
    desc: "Your data is protected with us.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Verified Services",
    desc: "Everything we offer is quality-checked.",
  },
  {
    icon: <FaGlobe />,
    title: "Global Presence",
    desc: "Serving users across multiple countries.",
  },
  {
    icon: <FaUsers />,
    title: "Community Driven",
    desc: "Built with feedback from real people.",
  },
];

const Features = () => {
  return (
    <div className="bg-blue-100 py-12 px-4 sm:px-6 lg:px-20">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Why People Trust Us
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl shadow-md text-center flex flex-col items-center"
          >
            <div className="bg-blue-100 p-4 rounded-full mb-4 text-blue-600 text-3xl">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
