// AuthContext.js
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    loading: false,
  });

  const setUser = (userData) => {
    setAuthState({
      user: userData,
      loading: false,
    });
  };

  const logout = () => {
    localStorage.clear()
    window.location.href = "/login"
  }

  // ... rest of the context remains the same
  return (
    <AuthContext.Provider
      value={{
        ...authState,
        setUser,
        logout
        // ... other values
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);