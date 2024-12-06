import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { ApiProvider } from "./providers/ApiProvider";
import Router from "./router";
import { AuthProvider } from "./providers/AuthProvider";
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("CRITICAL ERROR.");
}

createRoot(rootElement).render(
  <StrictMode>
    <ApiProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ApiProvider>
  </StrictMode>
);
