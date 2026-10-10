import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import CompanyTracker from './pages/CompanyTracker.jsx';
import Dashboard from './pages/Dashboard.jsx';
import DsaTracker from './pages/DsaTracker.jsx';
import Home from './pages/Home.jsx';
import Interview from './pages/Interview.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';
import PlacementTracker from './pages/PlacementTracker.jsx';
import Profile from './pages/Profile.jsx';
import Register from './pages/Register.jsx';
import Resume from './pages/Resume.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/dsa-tracker" element={<DsaTracker />} />
        <Route path="/company-tracker" element={<CompanyTracker />} />
        <Route path="/placement-tracker" element={<PlacementTracker />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
