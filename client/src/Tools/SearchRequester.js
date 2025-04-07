export const TokenRequest = async () => {
    try {
        const token = localStorage.getItem("token")
        if (!token) {
            console.error("No token found");
            return { success: false, message: "No token found" };
        }
        
        const response = await fetch('http://127.0.0.1:8000/api/build-index', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
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
        console.log("Index built successfully:", data);
        
        return data;
    } catch (error) {
        console.error("Error building index:", error);
        return { success: false, message: error.message };
    }
};

export const CombinedSearch = async (searchInput) => {
    try {
        const token = localStorage.getItem("token");
        if (!searchInput || !searchInput.trim()) {
            console.error("No user search input found");
            return { success: false, message: "No search input found" };
        }
        
        // For single word searches, use search-by-term (more efficient)
        if (!searchInput.includes(' ')) {
            const response = await fetch(`http://127.0.0.1:8000/api/search-by-term?token=${token}&term=${searchInput.trim()}`);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("Server Error:", response.status, errorData.detail || response.statusText);
                return { 
                    success: false, 
                    message: errorData.detail || `Server error: ${response.status}` 
                };
            }
            
            const data = await response.json();
            console.log("Single term search results:", data);
            return data;
        } 
        // For multi-word searches, use the basic search with search_terms array
        else {
            const search_terms = searchInput.split(' ')
                .map(term => term.trim())
                .filter(term => term.length > 0);
            
            const response = await fetch(`http://127.0.0.1:8000/api/search`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, search_terms }),
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
            console.log("Multi-term search results:", data);
            return data;
        }
    } catch (error) {
        console.error("Error performing combined search:", error);
        return { success: false, message: error.message };
    }
};
