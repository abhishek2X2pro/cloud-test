'use client';

import { useState } from 'react'
import { Edit2, Trash2 } from 'lucide-react'

export default function Companies() {
  const [companies, setCompanies] = useState([
    { id: 1, name: 'RJIT BSF', email: 'admin@rjitbsf.com', employees: 245, status: 'Active' },
    { id: 2, name: 'Tech Solutions', email: 'contact@techsol.com', employees: 180, status: 'Active' },
    { id: 3, name: 'Digital World', email: 'info@digitalworld.com', employees: 120, status: 'Inactive' },
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', employees: '' })

  const handleAddCompany = () => {
    if (formData.name && formData.email) {
      const newCompany = {
        id: companies.length + 1,
        ...formData,
        employees: parseInt(formData.employees) || 0,
        status: 'Active'
      }
      setCompanies([...companies, newCompany])
      setFormData({ name: '', email: '', employees: '' })
      setShowForm(false)
    }
  }

  const handleDeleteCompany = (id) => {
    setCompanies(companies.filter(c => c.id !== id))
  }

  return (
    <div>
      <div className="page-header">
        <h2>Companies</h2>
        <p>Manage all companies in the system.</p>
      </div>

      {!showForm && (
        <div style={{ marginBottom: '20px' }}>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            + Add Company
          </button>
        </div>
      )}

      {showForm && (
        <div className="card" style={{ marginBottom: '20px' }}>
          <div className="card-header">
            <h3>Add New Company</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', padding: '20px' }}>
            <div className="filter-group">
              <label>Company Name</label>
              <input
                type="text"
                placeholder="Enter company name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="filter-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="filter-group">
              <label>Number of Employees</label>
              <input
                type="number"
                placeholder="Enter number"
                value={formData.employees}
                onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
              />
            </div>
          </div>
          <div style={{ padding: '20px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '10px' }}>
            <button className="btn btn-primary" onClick={handleAddCompany}>
              Add Company
            </button>
            <button className="btn btn-secondary" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h3>Company List</h3>
        </div>
        <div className="table-container">
          <table className="table-responsive">
            <thead>
              <tr>
                <th>#</th>
                <th>COMPANY NAME</th>
                <th>EMAIL</th>
                <th>EMPLOYEES</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id}>
                  <td>{company.id}</td>
                  <td>{company.name}</td>
                  <td>{company.email}</td>
                  <td>{company.employees}</td>
                  <td>
                    <span className={`status-badge status-${company.status.toLowerCase()}`}>
                      {company.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn action-btn-edit" title="Edit">
                        <Edit2 size={14} />
                      </button>
                      <button 
                        className="action-btn action-btn-delete" 
                        title="Delete"
                        onClick={() => handleDeleteCompany(company.id)}
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
