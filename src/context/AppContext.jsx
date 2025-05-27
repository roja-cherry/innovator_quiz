import { createContext, useContext, useState } from "react";

const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  const [title, setTitle] = useState("Innovator's IQ Quiz");

  return (
    <AppContext.Provider value={{ title, setTitle }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
