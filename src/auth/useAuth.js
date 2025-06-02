// source/auth/useAuth.js
import { createContext, useContext, useState } from 'react';

// Create AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    // Add your login logic here (e.g., using Firebase or another service)
    // On successful login, set the user
    setUser({ email }); // Example user object
  };

  const signup = async (email, password) => {
    // Add your signup logic here
    setUser({ email }); // Example user object
  };

  const logout = () => {
    setUser(null); // Clear user on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};