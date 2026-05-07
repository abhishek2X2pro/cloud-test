import { Outlet, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import '../styles/layout.css'

export default function AdminLayout({ auth, setAuth }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  if (!auth) {
    return <Navigate to="/login" />
  }

  return (
    <div className="admin-layout">
      <Sidebar auth={auth} isOpen={sidebarOpen} />
      <Header auth={auth} setAuth={setAuth} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
      <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Outlet />
      </main>
    </div>
  )
}
