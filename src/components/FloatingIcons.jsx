import React from "react";
import {
  FaBriefcase,
  FaLaptopCode,
  FaUsers,
  FaChartLine,
  FaFileAlt,
  FaUserTie,
  FaBuilding,
  FaSearch,
} from "react-icons/fa";

const icons = [
  {
    icon: <FaBriefcase />,
    size: 48,
    style: { top: "5%", left: "20%", animationDuration: "12s" },
  },
  {
    icon: <FaLaptopCode />,
    size: 54,
    style: {
      top: "30%",
      left: "70%",
      animationDuration: "15s",
      animationDelay: "3s",
    },
  },
  {
    icon: <FaUsers />,
    size: 44,
    style: {
      top: "50%",
      left: "40%",
      animationDuration: "10s",
      animationDelay: "6s",
    },
  },
  {
    icon: <FaChartLine />,
    size: 52,
    style: {
      top: "80%",
      left: "90%",
      animationDuration: "18s",
      animationDelay: "1s",
    },
  },
  {
    icon: <FaFileAlt />,
    size: 50,
    style: {
      top: "20%",
      left: "50%",
      animationDuration: "14s",
      animationDelay: "2s",
    },
  },
  {
    icon: <FaUserTie />,
    size: 48,
    style: {
      top: "65%",
      left: "20%",
      animationDuration: "16s",
      animationDelay: "5s",
    },
  },
  {
    icon: <FaBuilding />,
    size: 50,
    style: {
      top: "40%",
      left: "85%",
      animationDuration: "13s",
      animationDelay: "4s",
    },
  },
  {
    icon: <FaSearch />,
    size: 46,
    style: {
      top: "80%",
      left: "30%",
      animationDuration: "17s",
      animationDelay: "7s",
    },
  },
];

const FloatingIcons = ({ parentRelative = false }) => {
  return (
    <div
      className={`${
        parentRelative ? "absolute inset-0" : "fixed inset-0"
      } pointer-events-none z-0 overflow-hidden`}
    >
      {icons.map(({ icon, size, style }, i) => (
        <div
          key={i}
          className="absolute text-blue-500 opacity-70 animate-floating"
          style={{ fontSize: size, ...style }}
        >
          {icon}
        </div>
      ))}
    </div>
  );
};

export default FloatingIcons;
