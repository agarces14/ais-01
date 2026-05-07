import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./index.css";

import App from "./App";
import Dashboard from "./pages/Dashboard";
import LeadAgent from "./pages/LeadAgent";
import ProposalAgent from "./pages/ProposalAgent";
import OutreachAgent from "./pages/OutreachAgent";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/lead-agent" element={<LeadAgent />} />
<Route path="/dashboard/proposal-agent" element={<ProposalAgent />} />
<Route path="/dashboard/outreach-agent" element={<OutreachAgent />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
