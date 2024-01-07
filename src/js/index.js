import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.getElementById("root");

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Check if the createRoot API is available (React 18+)
if (createRoot) {
  const rootContainer = createRoot(root);
  rootContainer.render(app);
} else {
  ReactDOM.render(app, root);
}
