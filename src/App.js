import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Groups from './pages/Groups';
import Posts from './pages/Post';
import Profile from './pages/profile'; // Ensure proper capitalization

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to /app/groups */}
        <Route path="/" element={<Navigate to="/app/groups" replace />} />

        <Route path="/app" element={<Layout />}>
          <Route index element={<Navigate to="/app/groups" replace />} />
          <Route path="groups" element={<Groups />} />
          <Route path="posts" element={<Posts />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="" element={<Navigate to="/app/groups" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
