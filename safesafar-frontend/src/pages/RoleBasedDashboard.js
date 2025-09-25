// src/pages/RoleBasedDashboard.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import AdminDashboard from './AdminPage/AdminDashboard';
import TourismDeptDashboard from './TourismPage/TourismDeptDashboard';
import GovtDashboard from './GovtPage/GovtDashboard';
import PoliceDashboard from './PolicePage/PoliceDashboard';
import Unauthorized from './Unauthorized';
import Navbar from '../components/Navbar'; // Make sure this exists

const RoleBasedDashboard = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setRole('unauthorized');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error || !data) {
        console.error('Error fetching role:', error);
        setRole('unauthorized');
      } else {
        setRole(data.role);
      }

      setLoading(false);
    };

    fetchUserRole();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  const renderDashboard = () => {
    console.log('Fetched role:', role);

    switch (role) {
      case 'admin':
        return <AdminDashboard />;
      case 'tourism_dept':
        return <TourismDeptDashboard />;
      case 'government':
        return <GovtDashboard />;
      case 'police':
        return <PoliceDashboard />;
      default:
        return <Unauthorized />;
    }
  };

  return (
    <div>
      <Navbar role={role} />
      {renderDashboard()}
    </div>
  );
};

export default RoleBasedDashboard;
