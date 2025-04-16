import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';  // Use your axios instance to handle API requests

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        
        await axiosInstance.post('/api/users/logout');
        navigate('/login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    logoutUser();
  }, [navigate]);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold">Logging out...</h2>
      </div>
    </div>
  );
};

export default Logout;
