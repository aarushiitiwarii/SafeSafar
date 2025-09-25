// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import RoleBasedDashboard from './pages/RoleBasedDashboard';
import Unauthorized from './pages/Unauthorized';
import { supabase } from './services/supabaseClient';

const App = () => {
  // PrivateRoute HOC for protecting routes
  const PrivateRoute = ({ children }) => {
    const [currentUser, setCurrentUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      const fetchUser = async () => {
        const { data, error } = await supabase.auth.getUser();
        if (data?.user) {
          setCurrentUser(data.user);
        } else {
          setCurrentUser(null);
        }
        setLoading(false);
      };
      fetchUser();

      // Optional: listen to auth state changes
      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        setCurrentUser(session?.user ?? null);
      });

      return () => listener.subscription.unsubscribe();
    }, []);

    if (loading) return <div>Loading...</div>;
    return currentUser ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected dashboard route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <RoleBasedDashboard />
            </PrivateRoute>
          }
        />

        {/* Unauthorized access page */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Redirect root and unknown paths */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
