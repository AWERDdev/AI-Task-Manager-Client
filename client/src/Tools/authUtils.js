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
      localStorage.setItem('user', JSON.stringify(data.User)); // Fix here
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
 * Send signup data to the server
 * @param {Object} formData - User signup data
 * @returns {Promise<Object>} Result of the signup attempt
 */
export const sendSignupData = async (formData) => {
  try {
    const response = await fetch('http://localhost:3500/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Data sent successfully");
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.User)); // Fix here
      return { success: true };
    } else {
      console.log("Failed to send data");
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.log(`Failed to send data: ${error}`);
    return { success: false, message: "Network error" };
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
 * Sends new password update request
 * @param {string} password - New password
 * @returns {Promise<Object>} API response result
 */
export const sendNewPassword = async (password) => {
  try {
   // Get user data properly
   const userToken = localStorage.getItem('token'); // Token is usually a string
   const userInfo = JSON.parse(localStorage.getItem('user')); // Fix here
   const email = userInfo?.email; // Fix here

   console.log("User Token:", userToken);
   console.log("Stored User Info:", userInfo);
   console.log("Extracted Email:", email);

    if (!email) {
      return { success: false, message: "User not authenticated", status: 401 };
    }

    const response = await fetch("http://localhost:3500/api/UpdatePassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, email }),
    });

    const data = await response.json();
    return response.ok ? { success: true } : { success: false, message: data.message, status: response.status };
  } catch (error) {
    console.error("Network Error:", error);
    return { success: false, message: "Network error", status: 500 };
  }
};
/**
 * Handles password-related errors
 * @param {Object} result - API response result
 * @returns {Object} Formatted errors
 */
export const handlePasswordErrors = (result) => {
  let newErrors = {};

  if (result.status === 400) {
    newErrors.password = result.message || "Invalid input. Please check your details.";
  } else if (result.status === 401) {
    newErrors.password = result.message || "Incorrect password.";
  } else {
    newErrors.password = "Something went wrong. Please try again later."
  }
  return newErrors;
};

/**
 * Handles bios-related errors
 * @param {Object} result - API response result
 * @returns {Object} Formatted errors
 */
export const handleBiosErrors = (result) => {
  let errors = {};
  if (result.status === 400) {
    errors.bios = result.message || "Invalid bios input.";
  } else {
    errors.bios = "Something went wrong. Please try again later.";
  }
  return errors;
};

/**
 * Sends bios update request
 * @param {string} bios - User bio
 * @returns {Promise<Object>} API response result
 */
export const sendBios = async (bios) => {
  try {
    // Get user data properly
    const userToken = localStorage.getItem('token'); // Token is usually a string
    const userInfo = JSON.parse(localStorage.getItem('user')); // Fix here
    const email = userInfo?.email; // Fix here

    console.log("User Token:", userToken);
    console.log("Stored User Info:", userInfo);
    console.log("Extracted Email:", email);

    if (!email) {
      return { success: false, message: "User not authenticated", status: 401 };
    }

    console.log("Sending bios update request:", { email, bios });

    const response = await fetch("http://localhost:3500/api/UpdateUserBios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, bios }),
    });

    if (!response.ok) {
      console.error("Server response not OK:", response.status, response.statusText);
    }

    const data = await response.json();
    return response.ok
      ? { success: true, data }
      : { success: false, message: data.message || "Failed to update bio", status: response.status };
  } catch (error) {
    console.error("Network Error in sendBios:", error);
    return { success: false, message: "Network error", status: 500 };
  }
};
