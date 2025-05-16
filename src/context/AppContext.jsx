import { createContext, useContext, useState } from "react";

const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [title, setTitle] = useState("Innovator's IQ Quiz");

  return (
    <AppContext.Provider value={{ isOpen, title, setTitle }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
