import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="min-h-screen bg-white text-[#6f6f6f]">
      <div className="max-w-3xl mx-auto p-4 min-h-screen bg-background text-textPrimary">
        <App />
      </div>
    </div>
  </StrictMode>
);
