/** 
 * @returns {Object} User tasks data 
 */
export const RequestTasks = async () => {
    try {
        const userData = JSON.parse(localStorage.getItem("user"));
        
        if (!userData || !userData.token) {
            console.error("No user data or token found in localStorage.");
            return { success: false, message: "No authentication token found" };
        }
        
        const response = await fetch("http://127.0.0.1:8000/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: userData.token }),
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Server Error:", response.status, errorData.detail || response.statusText);
            return { 
                success: false, 
                message: errorData.detail || `Server error: ${response.status}` 
            };
        }
        
        const data = await response.json();
        // console.log("Fetched Tasks:", data);
        
        return data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return { success: false, message: error.message };
    }
};

export const RequestUsersTasks = async () => {
    try {
        const result = await RequestTasks();
        if (result.success) {
            console.log('Fetching tasks successful');
            return result.tasks;
        } else {
            console.log('Fetching tasks failed:', result.message);
            return [];
        }
    } catch (error) {
        console.error("Error in RequestUsersTasks:", error);
        return [];
    }
};
export const DeleteTask = async (taskId) => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      console.log("Token:", token);
      
      if (!token) {
        return { success: false, message: "No authentication token found" };
      }
  
      // Use the correct API base URL - adjust this to match your backend URL
      const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Change this to your actual backend URL
      
      // Make the API call to delete the task
      console.log(`Sending DELETE request to: ${API_BASE_URL}/tasks with task ID: ${taskId}`);
      
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          token: token,
          task_id: taskId 
        }),
      });
  
    //   console.log("Response status:", response.status);
      
      if (!response.ok) {
        return { 
          success: false, 
          message: `Server returned ${response.status}: ${response.statusText}` 
        };
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in DeleteTask:", error);
      return { success: false, message: "An error occurred while deleting the task" };
    }
  };



  /** 
 * @returns {Object} User tasks data 
 */
export const RequestTasksSearch = async () => {
  try {
      const userData = JSON.parse(localStorage.getItem("user"));
      
      if (!userData || !userData.token) {
          console.error("No user data or token found in localStorage.");
          return { success: false, message: "No authentication token found" };
      }
      
      const response = await fetch("http://127.0.0.1:8000/api/usersTasks", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: userData.token }),
      });
      
      if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("Server Error:", response.status, errorData.detail || response.statusText);
          return { 
              success: false, 
              message: errorData.detail || `Server error: ${response.status}` 
          };
      }
      
      const data = await response.json();
    //   console.log("Fetched search Tasks:", data);
      
      return data;
  } catch (error) {
      console.error("Error fetching search tasks:", error);
      return { success: false, message: error.message };
  }
};
