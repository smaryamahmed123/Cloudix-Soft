// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminBlogs from './pages/AdminBlogs';
import AdminAbout from './pages/AdminAbout';
import AddWebsite from './pages/AdminWebsite';
import LogoManager from './pages/AdminLogoManager';
import AdminLayout from './components/AdminLayout';
import PrivateRoute from './components/PrivateRoute';
import AdminSubscribers from './pages/AdminSubscribers';
import AdminContactInfo from './pages/AdminContactInfo';
import AdminPostsManager from './pages/AdminPostsManager';
import PrivacyPolicyAdmin from './pages/AdminPrivacyPolicy';
import AdminContactMessage from './pages/AdminContactMessage';
import AdminServicesManager from './pages/AdminServicesManager';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="admin/dashboard" element={<Dashboard />} />
            <Route path="admin/messages" element={<AdminContactMessage />} />
            <Route path="admin/edit-contact" element={<AdminContactInfo />} />
            <Route path="admin/services" element={<AdminServicesManager />} />
            <Route path="/admin/subscribers" element={<AdminSubscribers />} />
            <Route path="admin/blogs" element={<AdminBlogs />} />
            <Route path="admin/about" element={<AdminAbout />} />
            <Route path="admin/privacy-policy" element={<PrivacyPolicyAdmin />} />
            <Route path="admin/portfolio" element={<LogoManager />} />
            <Route path="admin/post-design" element={<AdminPostsManager />} />
            <Route path="admin/addWebsite" element={<AddWebsite />} />
          </Route>
        </Route>

        {/* Optional: redirect any unknown route to login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
