import { AlertCircle } from "lucide-react";

const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required = false,
  icon: Icon,
  children,
  className = "",
  ...props
}) => {
  const baseInputClasses = `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 focus:-translate-y-0.5 focus:shadow-[0_4px_12px_rgba(59,130,246,0.15)]`;

  const inputClasses = error
    ? `${baseInputClasses} border-red-500 bg-red-50`
    : `${baseInputClasses} border-gray-300 hover:border-gray-400`;

  return (
    <div className={`form-field ${className}`}>
      <label className="form-field__label block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
        )}

        {children || (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${inputClasses} ${Icon ? "pl-12" : ""}`}
            {...props}
          />
        )}
      </div>

      {error && (
        <p className="form-field__error text-red-600 text-sm mt-1 flex items-center animate-[slideIn_0.2s_ease-out]">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
