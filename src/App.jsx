import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Dashboard from './components/Auth/Dashboard';

import DashboardContent from './components/Content/DashboardContent';
import InventoriContent from './components/Content/InventoriContent';
import PersonelContent from './components/Content/PersonelContent';
import LaporanContent from './components/Content/LaporanContent';
import PengaturanContent from './components/Content/PengaturanContent';

function App() {
  return (
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Each Page with Dashboard Layout */}
        <Route path="/dashboardcontent" element={
          <Dashboard><DashboardContent /></Dashboard>
        } />
        <Route path="/inventoricontent" element={
          <Dashboard><InventoriContent /></Dashboard>
        } />
        <Route path="/personilcontent" element={
          <Dashboard><PersonelContent /></Dashboard>
        } />
        <Route path="/laporancontent" element={
          <Dashboard><LaporanContent /></Dashboard>
        } />
        <Route path="/pengaturancontent" element={
          <Dashboard><PengaturanContent /></Dashboard>
        } />
      </Routes>
  );
}

export default App;
