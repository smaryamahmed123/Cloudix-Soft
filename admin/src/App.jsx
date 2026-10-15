// frontend/src/App.jsx
import React, { lazy, Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AdminBlogs = lazy(() => import('./pages/AdminBlogs'));
const AdminAbout = lazy(() => import('./pages/AdminAbout'));
const AddWebsite = lazy(() => import('./pages/AdminWebsite'));
const LogoManager = lazy(() => import('./pages/AdminLogoManager'));
const AdminLayout = lazy(() => import('./components/AdminLayout'));
const PrivateRoute = lazy(() => import('./components/PrivateRoute'));
const AdminSubscribers = lazy(() => import('./pages/AdminSubscribers'));
const AdminContactInfo = lazy(() => import('./pages/AdminContactInfo'));
const AdminPostsManager = lazy(() => import('./pages/AdminPostsManager'));
const PrivacyPolicyAdmin = lazy(() => import('./pages/AdminPrivacyPolicy'));
const AdminContactMessage = lazy(() => import('./pages/AdminContactMessage'));
const AdminServicesManager = lazy(() => import('./pages/AdminServicesManager'));
const AdminTestimonialsManager = lazy(() => import('./pages/AdminTestimonialsManager'));

const Loader = (
  <Box sx={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
    <CircularProgress />
  </Box>
);

const App = () => {
  return (
    <Router>
      <Suspense fallback={Loader}>
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
              <Route path="admin/testimonials" element={<AdminTestimonialsManager />} />
            </Route>
          </Route>

          {/* Optional: redirect any unknown route to login */}
          <Route path="*" element={<Login />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
