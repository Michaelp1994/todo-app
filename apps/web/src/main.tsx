import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./components/App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("CRITICAL ERROR.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
