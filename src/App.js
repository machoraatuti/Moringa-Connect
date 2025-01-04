import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Groups from "./pages/Groups";
import Posts from "./pages/Post";
import Profile from "./pages/profile";
import Events from "./pages/Events";
import { AdminProvider } from "./components/AdminContext";
import AdminDashboard from "./pages/Dashpage";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

function App() {
  return (
    <AdminProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route 
              path="/admin/*" 
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              } 
            />
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="app/groups" element={<Groups />} />
              <Route path="app/posts" element={<Posts />} />
              <Route path="app/profile" element={<Profile />} />
              <Route path="app/events" element={<Events />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AdminProvider>
  );
}

export default App;