import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from "../Authentication/Signup";
import Login from '../Authentication/Login';
import Logout from '../Authentication/Logout';
import UserDetails from '../Components/UserDetails';

import TodoRoutes from './TodoRoutes';
import LandingPage from '../Components/Landingpage'; // ✅ Import Landing Page

export default function UserRoute() {


  return (
    <Routes>
      <Route path="/" element={<LandingPage />} /> {/* ✅ Add Landing Page route */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/userdetails" element={<UserDetails />} />
      <Route path="/todos/*" element={<TodoRoutes />} />
    </Routes>
  );
}
