// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('role_id')
        .eq('id', user.id)
        .single();

      if (error || !data) {
        setRole('Unknown');
        return;
      }

      // Map role_id to role name (assuming you have a roles table)
      const { data: roleData } = await supabase
        .from('roles')
        .select('name')
        .eq('id', data.role_id)
        .single();

      setRole(roleData?.name || 'Unknown');
    };

    fetchRole();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <nav style={{ padding: '10px 20px', backgroundColor: '#282c34', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
      <div>SafeSafar</div>
      <div>
        Role: {role} | <button onClick={handleLogout} style={{ padding: '5px 10px' }}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
