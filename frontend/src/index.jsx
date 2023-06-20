import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

createRoot(rootElement).render(app);
