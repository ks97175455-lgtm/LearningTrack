import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./styles.css";

import { AuthProvider } from "./context/AuthContext";
import { LearningProvider } from "./context/LearningContext";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>

    <AuthProvider>
      <LearningProvider>

        <App />

      </LearningProvider>
    </AuthProvider>

  </React.StrictMode>
);