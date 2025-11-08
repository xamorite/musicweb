// lib/auth.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// --- Use the globally defined environment variable ---
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// Append the specific path for Auth services
const API_AUTH_URL = `${BASE_URL}/api/auth`;


export const useAuth = () => {
  // Use 'undefined' as the initial state to represent "checking/loading"
  // null will now explicitly mean "not authenticated"
  const [user, setUser] = useState(undefined); 
  const [isAuthReady, setIsAuthReady] = useState(false); // New state to signal check completion
  const router = useRouter();

  // Load user from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null); // Explicitly set to null if no session found
    }
    // Set ready flag only after the initial check is complete
    setIsAuthReady(true);
  }, []);

  // --- 1. Login Function ---
  const login = async (email, password) => {
    try {
      // Use API_AUTH_URL for login endpoint
      const response = await fetch(`${API_AUTH_URL}/login`, { // or /authenticate
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Log the full response body for better debugging if authentication fails
        const errorData = await response.json().catch(() => ({ message: 'Authentication failed.' }));
        console.error('Login failed response:', errorData);
        throw new Error(errorData.message || 'Authentication failed. Invalid credentials or server error.');
      }

      const data = await response.json();
      
      // --- FIX APPLIED HERE: Aliasing token field names ---
      const rawToken = data.token || data.jwtToken || data.accessToken || null; 

      const { 
          userId = null,           // Try to get id directly from data
          name = '',           // Try to get name directly from data
          email: responseEmail = email, // Get email from data, fallback to input email
          userDetails = {}     // Handle nested user details as a fallback object
      } = data; 
      
      const token = rawToken || userDetails.token; // Final token check
      // --- END FIX ---


      if (!token) {
          throw new Error('Login failed: Token missing in response.');
      }
      
      // Store the JWT token
      localStorage.setItem('jwtToken', token);
      
      // Construct loggedInUser object: Prioritize top-level fields, then check userDetails
      const loggedInUser = { 
        id: userId || userDetails.id || null, 
        email: responseEmail || userDetails.email || email, 
        name: name || userDetails.name || email 
      };
      
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setUser(loggedInUser);

      // Redirect to /home
      router.push('/home'); 
      return true;

    } catch (error) {
      console.error('Login error:', error);
      // In a real app, use a modal/toast instead of alert
      if (typeof window !== 'undefined' && window.alert) window.alert(error.message || 'An unknown error occurred during login.');
      return false;
    }
  };

  // --- 2. Register Function ---
  const register = async (form) => {
    const { fullName, email, password } = form; // Assuming form structure from register page

    try {
      // Use API_AUTH_URL for register endpoint
      const response = await fetch(`${API_AUTH_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, password }), // Match the Spring Boot DTO fields
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed.');
      }

      // In a real app, use a modal/toast instead of alert
      if (typeof window !== 'undefined' && window.alert) window.alert('Registration successful! Please log in.');
      router.push('/bio');
      return true;

    } catch (error) {
      console.error('Registration error:', error.message);
      // In a real app, use a modal/toast instead of alert
      if (typeof window !== 'undefined' && window.alert) window.alert(error.message);
      return false;
    }
  };
  
  // --- 3. Logout Function ---
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('jwtToken'); // Clear the token
    router.push('/login');
  }

  return { user, login, register, logout, isAuthReady };
};