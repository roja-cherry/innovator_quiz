import { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, SetLoading] = useState(false);

  const logout = () => {
    localStorage.clear()
    window.location.href ="/login"
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
