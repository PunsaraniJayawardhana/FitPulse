import { useState } from 'react';

// Regular Expression for password validation (at least 8 characters, one uppercase letter, one special character)
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&])[A-Za-z\d!@#$&]{8,}$/;

const useFormHandler = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = (rules) => {
    let isValid = true;
    const newErrors = {};

    Object.keys(rules).forEach((field) => {
      const value = values[field];
      const rule = rules[field];

      // Required field check
      if (rule.required && !value) {
        isValid = false;
        newErrors[field] = `${field} is required`;
        return;
      }

      // Minimum length check
      if (rule.minLength && value?.length < rule.minLength) {
        isValid = false;
        newErrors[field] = `${field} must be at least ${rule.minLength} characters, contain at least one uppercase letter, and include one special character (@, !, #, $, &)`;
        return;
      }

      // Email format check
      if (rule.email && !/^\S+@\S+\.\S+$/.test(value)) {
        isValid = false;
        newErrors[field] = `Invalid email format`;
        return;
      }

      // Numeric check for mobile number
      if (rule.numeric && !/^\d+$/.test(value)) {
        isValid = false;
        newErrors[field] = `${field} must be numeric`;
        return;
      }

      // Exact match check (e.g., for password confirmation)
      if (rule.match && value !== values[rule.match]) {
        isValid = false;
        newErrors[field] = `${field} does not match ${rule.match}`;
        return;
      }

      // Password validation (directly added into validate function)
      if (field === 'password') {
        if (rule.required && !value) {
          isValid = false;
          newErrors[field] = 'Password is required';
          return;
        }

        if (!passwordRegex.test(value)) {
          isValid = false;
          newErrors[field] = 'Password must be at least 8 characters, contain at least one uppercase letter, and include one special character (@, !, #, $, &)';
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const resetValues = () => {
    setValues(initialValues);  // Reset to the initial state
  };

  return { values, errors, handleChange, validate, resetValues };
};

export default useFormHandler;
