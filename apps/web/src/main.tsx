import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { ApiProvider } from "./providers/ApiProvider";
import App from "./components/App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("CRITICAL ERROR.");
}

createRoot(rootElement).render(
  <StrictMode>
    <ApiProvider>
      <App />
    </ApiProvider>
  </StrictMode>,
);
