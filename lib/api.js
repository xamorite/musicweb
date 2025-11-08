// lib/api.js
import { useRouter } from 'next/navigation';
// Import necessary React hooks
import { useCallback } from 'react'; 

// Use the globally defined environment variable
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useApi = () => {
    const router = useRouter();

    /**
     * Fetches data from a protected backend endpoint, including the JWT token.
     * Handles 401 Unauthorized responses by clearing session and redirecting.
     * @param {string} endpoint - The specific API path (e.g., '/user/profile/123')
     * @param {string} [method='GET'] - HTTP method
     * @param {object} [body=null] - JSON body for POST/PUT requests
     * @returns {Promise<any>} The parsed JSON data from the API response.
     */
    const fetchAuthenticatedData = useCallback(async (endpoint, method = 'GET', body = null) => {
        // MANDATORY: Retrieve the stored JWT Token
        const token = localStorage.getItem('jwtToken'); 

        if (!token) {
            // No token found, user should be redirected by useAuth wrapper
            console.warn('Attempted to fetch authenticated data without a token.');
            localStorage.removeItem('user');
            router.push('/login');
            throw new Error('No session token found. Please log in again.');
        }

        const url = `${BASE_URL}/api${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
        
        const headers = {
            'Content-Type': 'application/json',
            // MANDATORY: Attach the token as a Bearer header
            'Authorization': `Bearer ${token}` 
        };

        try {
            const response = await fetch(url, {
                method: method,
                headers: headers,
                body: body ? JSON.stringify(body) : null,
            });

            // Handle the 401 Unauthorized response
            if (response.status === 401) {
                console.error('API Error: 401 Unauthorized. Session likely expired or token invalid.');
                
                // --- Session Cleanup & Redirect ---
                localStorage.removeItem('jwtToken');
                localStorage.removeItem('user');
                router.push('/login');
                throw new Error('Session expired. Please log in again.');
            }

           if (!response.ok) {
                // Handle other HTTP errors (400, 500, etc.)
                const errorData = await response.json().catch(() => ({ message: `API request failed with status: ${response.status}. No JSON response body.` }));
                
                // Log the exact error status here for better client-side context
                console.error(`API Error Status: ${response.status}`, errorData); 
                
                // Throw a more informative error
                throw new Error(errorData.message || `API request failed with status: ${response.status}`);
            }

            // Return response.json() only if the status is 204 No Content
            if (response.status === 204) return null; 

            return response.json();

        } catch (error) {
            // Re-throw the error to be handled by the component
            console.error('Fetch operation failed:', error.message);
            throw error;
        }
    }, [router]); // Re-create the function only if router changes (which it won't)

    return { fetchAuthenticatedData };
};