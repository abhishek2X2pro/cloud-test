'use client';

import React from 'react';
import { Home, FileText, Folder, CheckSquare, Calendar, Gift, Users, Phone } from 'lucide-react';

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

export default function Sidebar({ activeMenu, setActiveMenu }: SidebarProps) {
  const menuItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: Home },
    { id: 'Attendance', label: 'Attendance', icon: FileText },

    { id: 'TaskManagement', label: 'Task Management', icon: CheckSquare },
    { id: 'LeaveManagement', label: 'Leave Management', icon: Calendar },
    { id: 'HolidaysAlmanac', label: 'Holidays Almanac', icon: Gift },
    { id: 'AssignedMembers', label: 'Assigned Members', icon: Users },
    { id: 'HelpfulContacts', label: 'Helpful Contacts', icon: Phone },
  ];

  return (
    <div className="w-72 bg-sidebar border-r border-border px-5 py-6 flex flex-col overflow-y-auto">
      <div className="mb-8 pb-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">RJIT BSF</h2>
        <p className="text-sm text-muted-foreground">RJIT BSF</p>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive
                ? 'bg-sidebar-accent text-primary border-l-4 border-primary pl-3'
                : 'text-muted-foreground hover:bg-sidebar-accent hover:text-foreground'
                }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
