"use client"

const FormField = ({
  id,
  name,
  type = "text",
  label,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  icon: Icon,
  className = "",
  autoComplete,
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />}

        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          className={`
            w-full px-3 py-2 border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent 
            transition-all duration-200 
            disabled:opacity-50 disabled:cursor-not-allowed
            ${Icon ? "pl-10" : "pl-3"}
            ${error ? "border-red-500 focus:ring-red-500" : ""}
            ${className}
          `}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </div>

      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField
