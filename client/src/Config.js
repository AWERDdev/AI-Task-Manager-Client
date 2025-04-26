// Environment configuration for the application
const isProduction = import.meta.env?.MODE === 'production';

const config = {
  // API URLs
  nodeApiUrl: isProduction
    // ? 'https://aff3-41-46-57-203.ngrok-free.app' // debuging
     ? 'https://quick-marion-awerddev-c9f60f67.koyeb.app/' // Replace with your public server URL
    : import.meta.env?.VITE_NODE_API_URL || 'http://localhost:3500',

  pythonApiUrl: isProduction
    // ? '' // debuging
    ? '' // Replace with your public server URL
    : import.meta.env?.VITE_PYTHON_API_URL || 'http://127.0.0.1:8000',

  // Other configuration parameters
  apiTimeout: parseInt(import.meta.env?.VITE_API_TIMEOUT) || 30000,
  enableDebugMode: import.meta.env?.VITE_DEBUG_MODE === 'true' || false,

  // Environment flags
  isProduction,
  isDevelopment: !isProduction,
};

export default config;
