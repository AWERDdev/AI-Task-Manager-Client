import config from '../Config';

/**
 * Request user tasks from the server
 * @returns {Object} User tasks data
 */
export const RequestTasks = async () => {
    try {
        const userData = JSON.parse(localStorage.getItem("user"));
        
        if (!userData || !userData.token) {
            if (config.enableDebugMode) {
                console.error("No user data or token found in localStorage.");
            }
            return { success: false, message: "No authentication token found" };
        }
        
        const response = await fetch(`${config.pythonApiUrl}/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: userData.token }),
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            if (config.enableDebugMode) {
                console.error("Server Error:", response.status, errorData.detail || response.statusText);
            }
            return {
                success: false,
                message: errorData.detail || `Server error: ${response.status}`
            };
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        if (config.enableDebugMode) {
            console.error("Error fetching tasks:", error);
        }
        return { success: false, message: error.message };
    }
};

/**
 * Request and extract user tasks
 * @returns {Array} Array of user tasks or empty array if failed
 */
export const RequestUsersTasks = async () => {
    try {
        const result = await RequestTasks();
        if (result.success) {
            if (config.enableDebugMode) {
                console.log('Fetching tasks successful');
            }
            return result.tasks;
        } else {
            if (config.enableDebugMode) {
                console.log('Fetching tasks failed:', result.message);
            }
            return [];
        }
    } catch (error) {
        if (config.enableDebugMode) {
            console.error("Error in RequestUsersTasks:", error);
        }
        return [];
    }
};

/**
 * Delete a task by ID
 * @param {string} taskId - ID of the task to delete
 * @returns {Object} Result of the delete operation
 */
export const DeleteTask = async (taskId) => {
    try {
        // Get the token from localStorage
        const token = localStorage.getItem('token');
        if (config.enableDebugMode) {
            console.log("Token:", token);
        }
        
        if (!token) {
            return { success: false, message: "No authentication token found" };
        }
        
        if (config.enableDebugMode) {
            console.log(`Sending DELETE request to: ${config.pythonApiUrl}/api/tasks with task ID: ${taskId}`);
        }
        
        const response = await fetch(`${config.pythonApiUrl}/api/tasks`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token,
                task_id: taskId
            }),
        });
        
        if (!response.ok) {
            return {
                success: false,
                message: `Server returned ${response.status}: ${response.statusText}`
            };
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        if (config.enableDebugMode) {
            console.error("Error in DeleteTask:", error);
        }
        return { success: false, message: "An error occurred while deleting the task" };
    }
};

/**
 * Request tasks for search functionality
 * @returns {Object} User tasks data for search
 */
export const RequestTasksSearch = async () => {
    try {
        const userData = JSON.parse(localStorage.getItem("user"));
        
        if (!userData || !userData.token) {
            if (config.enableDebugMode) {
                console.error("No user data or token found in localStorage.");
            }
            return { success: false, message: "No authentication token found" };
        }
        
        const response = await fetch(`${config.pythonApiUrl}/api/usersTasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: userData.token }),
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            if (config.enableDebugMode) {
                console.error("Server Error:", response.status, errorData.detail || response.statusText);
            }
            return {
                success: false,
                message: errorData.detail || `Server error: ${response.status}`
            };
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        if (config.enableDebugMode) {
            console.error("Error fetching search tasks:", error);
        }
        return { success: false, message: error.message };
    }
};
