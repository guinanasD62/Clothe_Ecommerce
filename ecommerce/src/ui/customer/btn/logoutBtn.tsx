// src/components/LogoutButton.tsx

import React from 'react';
import { useDispatch } from 'react-redux';
import { clearSession } from '../../../redux/customerSlice/session'; // Ensure the correct path

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearSession());
  };

  
  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
