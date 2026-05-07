'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/attendance/Sidebar';
import Header from '@/components/attendance/Header';
import AttendancePanel from '@/components/attendance/AttendancePanel';
import DashboardPanel from '@/components/attendance/DashboardPanel';
import LeaveManagement from '@/components/attendance/LeaveManagement';

export default function Page() {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setIsAuthenticated(true);
    } else {
      router.push('/login');
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // Redirect happens in useEffect
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        {activeMenu === 'Dashboard' ? (
          <DashboardPanel />
        ) : activeMenu === 'Attendance' ? (
          <AttendancePanel />
        ) : activeMenu === 'LeaveManagement' ? (
          <LeaveManagement />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center p-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">This section is under development.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
