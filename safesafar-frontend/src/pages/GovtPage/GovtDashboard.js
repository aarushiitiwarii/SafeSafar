// src/pages/GovtPage/GovtDashboard.js
import React from 'react';
import Navbar from '../../components/Navbar';

const GovtDashboard = () => {
  return (
    <div>
      <h1>Government Dashboard [Govt]</h1>
      <p>Welcome, Government user! Here are your features:</p>
      <ul>
        <li>View Requests</li>
        <li>Approve Projects</li>
        <li>Policy Updates</li>
      </ul>
    </div>
  );
};

export default GovtDashboard;
