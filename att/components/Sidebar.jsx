'use client';

import React from 'react';

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const menuItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'Attendance', label: 'Attendance', icon: '📋' },

    { id: 'TaskManagement', label: 'Task Management', icon: '✎' },
    { id: 'LeaveManagement', label: 'Leave Management', icon: '📅' },
    { id: 'HolidaysAlmanac', label: 'Holidays Almanac', icon: '🎉' },
    { id: 'AssignedMembers', label: 'Assigned Members', icon: '👥' },
    { id: 'HelpfulContacts', label: 'Helpful Contacts', icon: '☎️' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>RJIT BSF</h2>
        <p>RJIT BSF</p>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeMenu === item.id ? 'active' : ''}`}
            onClick={() => setActiveMenu(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
