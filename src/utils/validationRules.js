export const validationRules = {
  fullName: [
    (value) => (!value?.trim() ? "Full name is required" : ""),
    (value) =>
      value?.trim().length < 2 ? "Name must be at least 2 characters" : "",
    (value) =>
      !/^[a-zA-Z\s]+$/.test(value)
        ? "Name can only contain letters and spaces"
        : "",
  ],

  email: [
    (value) => (!value?.trim() ? "Email is required" : ""),
    (value) =>
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? "Please enter a valid email address"
        : "",
  ],

  phone: [
    (value) => (!value?.trim() ? "Phone number is required" : ""),
    (value) =>
      !/^[+]?[1-9][\d]{0,15}$/.test(value?.replace(/[\s\-()]/g, ""))
        ? "Please enter a valid phone number"
        : "",
  ],

  role: [(value) => (!value ? "Please select a role" : "")],

  resume: [(value) => (!value ? "Resume is required" : "")],

  experience: [
    (value) =>
      !value?.toString().trim() ? "Years of experience is required" : "",
    (value) =>
      isNaN(value) || value < 0 || value > 50
        ? "Please enter a valid number of years (0-50)"
        : "",
  ],

  expectedSalary: [
    (value) => (!value?.trim() ? "Expected salary is required" : ""),
    (value) => {
      const numValue = value?.replace(/[,$]/g, "");
      return isNaN(numValue) || numValue <= 0
        ? "Please enter a valid salary amount"
        : "";
    },
  ],

  availableDate: [
    (value) => (!value ? "Available start date is required" : ""),
    (value) =>
      new Date(value) < new Date() ? "Start date cannot be in the past" : "",
  ],

  linkedinUrl: [
    (value) => {
      if (!value) return ""; // Optional field
      return !/^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/.test(value)
        ? "Please enter a valid LinkedIn profile URL"
        : "";
    },
  ],

  portfolioUrl: [
    (value) => {
      if (!value) return ""; // Optional field
      return !/^https?:\/\/.+\..+/.test(value)
        ? "Please enter a valid portfolio URL"
        : "";
    },
  ],

  coverLetter: [
    (value) => (!value?.trim() ? "Cover letter is required" : ""),
    (value) =>
      value?.trim().length < 50
        ? "Cover letter must be at least 50 characters"
        : "",
  ],
};
