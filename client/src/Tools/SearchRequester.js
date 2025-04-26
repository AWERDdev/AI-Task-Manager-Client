import config from '../Config';

/**
 * Request to build search index on the server
 * @returns {Promise<Object>} Result of the index building operation
 */
export const TokenRequest = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            if (config.enableDebugMode) {
                console.error("No token found");
            }
            return { success: false, message: "No token found" };
        }
        
        const response = await fetch(`${config.pythonApiUrl}/api/build-index`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
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
        if (config.enableDebugMode) {
            console.log("Index built successfully:", data);
        }
        
        return data;
    } catch (error) {
        if (config.enableDebugMode) {
            console.error("Error building index:", error);
        }
        return { success: false, message: error.message };
    }
};

/**
 * Perform a combined search using the appropriate API endpoint based on search input
 * @param {string} searchInput - User's search query
 * @returns {Promise<Object>} Search results
 */
export const CombinedSearch = async (searchInput) => {
    try {
        const token = localStorage.getItem("token");
        if (!searchInput || !searchInput.trim()) {
            if (config.enableDebugMode) {
                console.error("No user search input found");
            }
            return { success: false, message: "No search input found" };
        }
        
        // For single word searches, use search-by-term (more efficient)
        if (!searchInput.includes(' ')) {
            const response = await fetch(
                `${config.pythonApiUrl}/api/search-by-term?token=${token}&term=${searchInput.trim()}`
            );
            
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
            if (config.enableDebugMode) {
                console.log("Single term search results:", data);
            }
            return data;
        }
        // For multi-word searches, use the basic search with search_terms array
        else {
            const search_terms = searchInput.split(' ')
                .map(term => term.trim())
                .filter(term => term.length > 0);
            
            const response = await fetch(`${config.pythonApiUrl}/api/search`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, search_terms }),
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
            if (config.enableDebugMode) {
                console.log("Multi-term search results:", data);
            }
            return data;
        }
    } catch (error) {
        if (config.enableDebugMode) {
            console.error("Error performing combined search:", error);
        }
        return { success: false, message: error.message };
    }
};
