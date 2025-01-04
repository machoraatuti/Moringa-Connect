import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme"; // Import your custom theme
import Layout from "./components/Layout";
import Groups from "./pages/Groups";
import Posts from "./pages/Post";
import Profile from "./pages/profile";
import Events from "./pages/Events";
import Home from "./pages/Home"; // Import the Home component

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline applies the global styles */}
      <CssBaseline />
      <Router>
        <Routes>
          {/* Landing Page Route */}
          <Route path="/" element={<Home />} /> {/* Home is the landing page */}
          {/* Main app layout */}
          <Route path="/app" element={<Layout />}>
            <Route index element={<Navigate to="/app/groups" replace />} />
            <Route path="groups" element={<Groups />} />
            <Route path="posts" element={<Posts />} />
            <Route path="profile" element={<Profile />} />
            <Route path="events" element={<Events />} />
          </Route>
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
