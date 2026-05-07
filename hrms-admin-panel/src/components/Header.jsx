'use client';

import { useNavigate } from 'react-router-dom'
import { Clock, Bell, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'
import '../styles/header.css'

import { Menu } from 'lucide-react'

export default function Header({ auth, setAuth, toggleSidebar, sidebarOpen }) {
  const navigate = useNavigate()


  const handleLogout = () => {
    localStorage.removeItem('auth')
    setAuth(null)
    navigate('/login')
  }

  return (
    <header className={`header ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
      <div className="header-left">
        <h1 className="page-title-small">Welcome back, Admin</h1>
      </div>

      <div className="header-right">

        <button className="icon-btn toggle-btn" onClick={toggleSidebar}>
          <Menu size={20} />
        </button>

        <button className="icon-btn notification-btn">
          <Bell size={20} />
          <span className="notification-badge">0</span>
        </button>

        <div className="user-profile">
          <div className="user-avatar">{auth.name.charAt(0).toUpperCase()}</div>
          <span className="user-name">{auth.name}</span>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
        </button>
      </div>
    </header>
  )
}
