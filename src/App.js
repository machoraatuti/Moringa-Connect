import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Provider } from 'react-redux';
import { store } from './app/store';
import theme from "./theme";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Groups from "./pages/Groups";
import Posts from "./pages/Posts";
import Profile from "./pages/profile";
import Events from "./pages/Events";
import AdminDashboard from "./pages/Dashpage";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import UserRegistration from "./pages/UserRegistration";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<UserRegistration />} />
            <Route path="/" element={<Home />} />

            {/* Admin Routes - Grouped together */}
            <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminDashboard />} />
              <Route path="posts" element={<AdminDashboard />} />
            </Route>

            {/* Protected User Routes */}
            <Route element={<Layout />}>
              <Route path="app/groups" element={<Groups />} />
              <Route path="app/posts" element={<Posts />} />
              <Route path="app/profile" element={<Profile />} />
              <Route path="app/events" element={<Events />} />
            </Route>

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;