import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "react-datepicker/dist/react-datepicker.css";
import "./index.scss";
import { AppContextProvider } from "./context/AppContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </AuthContextProvider>
);
