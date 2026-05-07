'use client';

import { Edit2, Trash2, Shield } from 'lucide-react'

export default function AdminList() {
  const admins = [
    { id: 1, name: 'Admin User', email: 'admin@rjitbsf.com', company: 'RJIT BSF', role: 'ADMIN', joinDate: '01 Jan 2024' },
    { id: 2, name: 'Super Admin User', email: 'super@rjitbsf.com', company: 'RJIT BSF', role: 'SUPER_ADMIN', joinDate: '01 Jan 2024' },
    { id: 3, name: 'John Manager', email: 'john@techsol.com', company: 'Tech Solutions', role: 'ADMIN', joinDate: '15 Feb 2024' },
    { id: 4, name: 'Sarah Admin', email: 'sarah@digitalworld.com', company: 'Digital World', role: 'ADMIN', joinDate: '20 Mar 2024' },
  ]

  const handleDelete = (id) => {
    console.log('Delete admin:', id)
  }

  return (
    <div>
      <div className="page-header">
        <h2>Admin List</h2>
        <p>View and manage all admins in the system.</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>All Admins</h3>
        </div>
        <div className="table-container">
          <table className="table-responsive">
            <thead>
              <tr>
                <th>#</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>COMPANY</th>
                <th>ROLE</th>
                <th>JOIN DATE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td>{admin.id}</td>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>{admin.company}</td>
                  <td>
                    <span style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '6px',
                      padding: '4px 8px',
                      backgroundColor: admin.role === 'SUPER_ADMIN' ? 'rgba(30, 98, 232, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                      color: admin.role === 'SUPER_ADMIN' ? 'var(--primary-blue)' : 'var(--success-green)',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      <Shield size={14} />
                      {admin.role}
                    </span>
                  </td>
                  <td>{admin.joinDate}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn action-btn-edit" title="Edit">
                        <Edit2 size={14} />
                      </button>
                      <button 
                        className="action-btn action-btn-delete" 
                        title="Delete"
                        onClick={() => handleDelete(admin.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
