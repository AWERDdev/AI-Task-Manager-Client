import { useState } from "react";

/**
 * Email validation function
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Password validation function
 * @param {string} password - Password to validate
 * @param {number} minLength - Minimum password length
 * @returns {boolean} Whether password is valid
 */
export const isValidPassword = (password, minLength = 8) => {
  return password && password.length >= minLength;
};

/**
 * Form validation hook for login/signup
 * @returns {Object} Form state and validation functions
 */
export const useFormValidation = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    let newErrors = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (!isValidPassword(password)) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  return {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    setErrors,
    validateForm
  };
};


/**
 * Send login data to the server
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} Result of the login attempt
 */
export const sendLoginData = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3500/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log("Server Response:", data);
  
      if (response.ok) {
        localStorage.setItem('token', data.token);
        return { success: true };
      } else {
        return { success: false, message: data.message, status: response.status };
      }
    } catch (error) {
      console.error(`Network Error: ${error}`);
      return { success: false, message: "Network error", status: 500 };
    }
  };
  
  /**
   * Handle login error responses
   * @param {Object} result - API response result
   * @returns {Object} Formatted errors
   */
  export const handleLoginErrors = (result) => {
    let newErrors = {};
    
    if (result.status === 400) {
      newErrors.email = result.message || "Invalid input. Please check your details.";
      newErrors.password = "";
    } else if (result.status === 404) {
      newErrors.email = result.message || "Email not found.";
    } else if (result.status === 401) {
      newErrors.password = result.message || "Incorrect password.";
    } else {
      newErrors.email = "Something went wrong. Please try again later.";
      newErrors.password = "";
    }
    
    return newErrors;
  };



  /**
 * Validates signup form data
 * @param {Object} formData - The form data to validate
 * @returns {Object} Object containing errors and isValid flag
 */
export const validateSignupForm = (formData) => {
  let errors = {};
  
  if (!formData.fullName?.trim()) {
    errors.fullName = "Full Name is required";
  }
  
  if (!formData.Username?.trim()) {
    errors.Username = "Username is required";
  }
  
  if (!formData.email?.match(/^\S+@\S+\.\S+$/)) {
    errors.email = "Enter a valid email address";
  }
  
  if (!formData.password || formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }
  
  if (!formData.termsAccepted) {
    errors.termsAccepted = "You must accept the terms";
  }
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

/**
 * Custom hook for form handling
 * @param {Object} initialValues - Initial form values
 * @param {Function} validateFn - Validation function
 * @returns {Object} Form state and handlers
 */


export const useForm = (initialValues, validateFn) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };
  
  const validateForm = () => {
    const { errors, isValid } = validateFn(formData);
    setErrors(errors);
    return isValid;
  };
  
  const resetForm = () => {
    setFormData(initialValues);
    setErrors({});
  };
  
  return {
    formData,
    errors,
    handleChange,
    validateForm,
    setErrors,
    resetForm
  };
};
/**
 * Validates password input
 * @param {string} password - The password to validate
 * @param {string} confirmPassword - The confirmation password
 * @returns {Object} Object containing errors and isValid flag
 */
export const validatePassword = (password) => {
  let errors = {};

  // Ensure password is a string to avoid type errors
  if (typeof password !== "string") {
    password = "";
  }

  if (!password.trim()) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};


import { validatePassword as validatePasswordHelper } from "./validationUtils";

export const usePasswordValidation = () => {
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validatePassword = () => {
    const { errors, isValid } = validatePasswordHelper(password);
    setErrors(errors); // Updates errors state
    return isValid;
  };

  return {
    password,
    setPassword,
    errors,
    setErrors,
    validatePassword,
  };
};

/**
 * Custom hook for bios validation
 */
export const useBiosValidation = () => {
  const [bios, setBios] = useState("");
  const [biosErrors, setBiosErrors] = useState({}); // Changed from BiosErrors to biosErrors for consistency

  const validateBios = () => {
    // Simple validation for now
    let errors = {};
    let isValid = true;
    
    if (!bios.trim()) {
      errors.bios = "Bio cannot be empty";
      isValid = false;
    } else if (bios.length > 500) {
      errors.bios = "Bio cannot exceed 500 characters";
      isValid = false;
    }
    
    setBiosErrors(errors);
    return isValid;
  };

  return {
    bios,
    setBios,
    biosErrors,
    setBiosErrors,
    validateBios,
  };
};

// Add the validateBios helper function if it doesn't exist elsewhere
export const validateBios = (bios) => {
  let biosErrors = {};
  let isValid = true;
  
  if (!bios.trim()) {
    biosErrors.bios = "Bio cannot be empty";
    isValid = false;
  } else if (bios.length > 500) {
    biosErrors.bios = "Bio cannot exceed 500 characters";
    isValid = false;
  }
  
  return { biosErrors, isValid };
};

