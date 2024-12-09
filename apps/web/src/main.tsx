import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApiProvider } from "./contexts/api/ApiProvider";
import { AuthProvider } from "./contexts/auth/AuthProvider";
import Router from "./router";
import "./reset.css";
import "./globals.css";

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
