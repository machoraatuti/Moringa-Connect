import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Groups from "./pages/Groups";
import Posts from "./pages/Post";
import Profile from "./pages/profile" // Ensure proper capitalization
import Events from "./pages/Events"; // Import the Events component
import { AdminProvider } from "./components/AdminContext";
import AdminDashboard from "./pages/Dashpage";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

function App() {
  return (
    <AdminProvider>
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
          <Route path="/" element={<Navigate to="/app/groups" replace />} />
          <Route path="/app" element={<Layout />}>
            <Route index element={<Navigate to="/app/groups" replace />} />
            <Route path="groups" element={<Groups />} />
            <Route path="posts" element={<Posts />} />
            <Route path="profile" element={<Profile />} />
            <Route path="events" element={<Events />} />
          </Route>
          <Route path="*" element={<Navigate to="/app/groups" replace />} />
        </Routes>
      </Router>
    </AdminProvider>
  );
}

export default App;
