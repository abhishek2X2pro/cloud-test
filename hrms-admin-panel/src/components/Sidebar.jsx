import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Clock, Users, Calendar, DollarSign, BarChart3, Settings, Building2, Cog, Plus, List } from 'lucide-react'
import '../styles/sidebar.css'

export default function Sidebar({ auth, isOpen }) {
  const location = useLocation()

  const adminMenuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { label: 'Attendance', icon: Clock, path: '/admin/attendance' },
    { label: 'Leaves', icon: Calendar, path: '/admin/leaves' },
    { label: 'Payroll', icon: DollarSign, path: '/admin/payroll' },
    { label: 'Reports', icon: BarChart3, path: '/admin/reports' },
    { label: 'Settings', icon: Settings, path: '/admin/settings' },
  ]

  const superAdminMenuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/super-admin/dashboard' },
    {
      label: 'Company Management',
      items: [
        { label: 'Companies', icon: Building2, path: '/super-admin/companies' },
        { label: 'Office Settings', icon: Cog, path: '/super-admin/office-settings' },
      ],
    },
    {
      label: 'Admin Management',
      items: [
        { label: 'Create Admin', icon: Plus, path: '/super-admin/create-admin' },
        { label: 'Admin List', icon: List, path: '/super-admin/admin-list' },
      ],
    },
  ]

  const menuItems = auth.role === 'SUPER_ADMIN' ? superAdminMenuItems : adminMenuItems

  const isActive = (path) => location.pathname === path

  return (
    <div className={`sidebar ${isOpen ? '' : 'collapsed'}`}>
      <div className="sidebar-logo">
        <h2>RJIT BSF</h2>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item, idx) => {
          if (item.items) {
            // Group item
            return (
              <div key={idx} className="menu-group">
                <div className="menu-group-label">{item.label}</div>
                {item.items.map((subItem, subIdx) => {
                  const Icon = subItem.icon
                  return (
                    <Link
                      key={subIdx}
                      to={subItem.path}
                      className={`menu-item submenu-item ${isActive(subItem.path) ? 'active' : ''}`}
                    >
                      <Icon size={18} />
                      <span>{subItem.label}</span>
                    </Link>
                  )
                })}
              </div>
            )
          }

          const Icon = item.icon
          return (
            <Link
              key={idx}
              to={item.path}
              className={`menu-item ${isActive(item.path) ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
