'use client';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login'
import AdminLayout from './layouts/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import Attendance from './pages/admin/Attendance'
import Employees from './pages/admin/Employees'
import LeaveManagement from './pages/admin/LeaveManagement'
import Payroll from './pages/admin/Payroll'
import Reports from './pages/admin/Reports'
import Settings from './pages/admin/Settings'
import Companies from './pages/superadmin/Companies'
import OfficeSettings from './pages/superadmin/OfficeSettings'
import CreateAdmin from './pages/superadmin/CreateAdmin'
import AdminList from './pages/superadmin/AdminList'

export default function App() {
  const [auth, setAuth] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in (from localStorage or session)
    const savedAuth = localStorage.getItem('auth')
    if (savedAuth) {
      setAuth(JSON.parse(savedAuth))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>Loading...</div>
  }

  if (!auth) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    )
  }

  return (
    <Router>
      <Routes>
        <Route element={<AdminLayout auth={auth} setAuth={setAuth} />}>
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/attendance" element={<Attendance />} />
          <Route path="/admin/employees" element={<Employees />} />
          <Route path="/admin/leaves" element={<LeaveManagement />} />
          <Route path="/admin/payroll" element={<Payroll />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/settings" element={<Settings />} />

          {/* Super Admin Routes (only for SUPER_ADMIN role) */}
          {auth.role === 'SUPER_ADMIN' && (
            <>
              <Route path="/super-admin/dashboard" element={<Dashboard />} />
              <Route path="/super-admin/companies" element={<Companies />} />
              <Route path="/super-admin/office-settings" element={<OfficeSettings />} />
              <Route path="/super-admin/create-admin" element={<CreateAdmin />} />
              <Route path="/super-admin/admin-list" element={<AdminList />} />
            </>
          )}

          <Route path="*" element={<Navigate to={auth.role === 'SUPER_ADMIN' ? '/super-admin/dashboard' : '/admin/dashboard'} />} />
        </Route>
      </Routes>
    </Router>
  )
}
