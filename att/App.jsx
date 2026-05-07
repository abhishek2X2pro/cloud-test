'use client';

import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AttendancePanel from './components/AttendancePanel';

function App() {
  const [activeMenu, setActiveMenu] = useState('Attendance');

  return (
    <div className="app-container">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div className="main-content">
        <Header />
        <AttendancePanel />
      </div>
    </div>
  );
}

export default App;
