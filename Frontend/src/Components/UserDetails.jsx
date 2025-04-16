import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';

export default function UserDetails() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axiosInstance.get('/api/users/details');
        setUserDetails(response.data.user);
      } catch (err) {
        setError('Failed to fetch user details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <div className='h-screen flex justify-center items-center'>
        <div>
        Loading...</div></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="rounded-2xl shadow-lg p-8 w-[350px] flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-center text-black">User Details</h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-black mb-1">Name</label>
            <p className="p-2 rounded-md bg-white border border-gray-300">{userDetails?.name}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-black mb-1">Email</label>
            <p className="p-2 rounded-md bg-white border border-gray-300">{userDetails?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
