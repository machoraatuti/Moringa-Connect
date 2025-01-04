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
import Home from "./pages/Home";
import Groups from "./pages/Groups";
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";
import Events from "./pages/Events";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Main Layout Wrapper */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="app/groups" element={<Groups />} />
            <Route path="app/posts" element={<Posts />} />
            <Route path="app/profile" element={<Profile />} />
            <Route path="app/events" element={<Events />} />
          </Route>

          {/* Redirect to Home if route doesn't exist */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
