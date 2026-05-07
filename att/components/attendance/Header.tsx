'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Settings, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Header() {

  const [userName, setUserName] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUserName(userData.name || userData.email?.split('@')[0] || 'User');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    router.push('/login');
  };

  

  return (
    <div className="flex justify-between items-center px-6 py-4 border-b border-border bg-background">
      <div className="flex items-center gap-2">
        <div className="text-sm font-medium text-muted-foreground">
          Welcome, <span className="font-semibold text-foreground">{userName}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="relative p-2 hover:bg-muted rounded-md transition-colors">
          <Bell className="w-5 h-5 text-foreground" />
          <span className="absolute -top-0.5 -right-0.5 bg-destructive text-destructive-foreground text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
            0
          </span>
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-border">
          <div className="w-8 h-8 bg-primary text-primary-foreground text-sm font-semibold rounded-md flex items-center justify-center">
            {userName.charAt(0).toUpperCase()}
          </div>
          <button className="p-1.5 hover:bg-muted rounded-md transition-colors" onClick={handleLogout} title="Logout">
            <LogOut className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}