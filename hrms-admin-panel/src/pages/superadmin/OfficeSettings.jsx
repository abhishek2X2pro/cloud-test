'use client';

import { useState } from 'react'
import { Edit2, Trash2 } from 'lucide-react'

export default function OfficeSettings() {
  const [offices, setOffices] = useState([
    { id: 1, name: 'Main Office', city: 'Bangalore', country: 'India', address: '123 Tech Park' },
    { id: 2, name: 'Branch Office', city: 'Pune', country: 'India', address: '456 Business Hub' },
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', city: '', country: '', address: '' })

  const handleAddOffice = () => {
    if (formData.name && formData.city) {
      const newOffice = {
        id: offices.length + 1,
        ...formData
      }
      setOffices([...offices, newOffice])
      setFormData({ name: '', city: '', country: '', address: '' })
      setShowForm(false)
    }
  }

  const handleDeleteOffice = (id) => {
    setOffices(offices.filter(o => o.id !== id))
  }

  return (
    <div>
      <div className="page-header">
        <h2>Office Settings</h2>
        <p>Manage office locations and settings.</p>
      </div>

      {!showForm && (
        <div style={{ marginBottom: '20px' }}>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            + Add Office
          </button>
        </div>
      )}

      {showForm && (
        <div className="card" style={{ marginBottom: '20px' }}>
          <div className="card-header">
            <h3>Add New Office</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', padding: '20px' }}>
            <div className="filter-group">
              <label>Office Name</label>
              <input
                type="text"
                placeholder="e.g., Main Office"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="filter-group">
              <label>City</label>
              <input
                type="text"
                placeholder="e.g., Bangalore"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
            <div className="filter-group">
              <label>Country</label>
              <input
                type="text"
                placeholder="e.g., India"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              />
            </div>
            <div className="filter-group" style={{ gridColumn: '1 / -1' }}>
              <label>Address</label>
              <input
                type="text"
                placeholder="Enter office address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
          </div>
          <div style={{ padding: '20px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '10px' }}>
            <button className="btn btn-primary" onClick={handleAddOffice}>
              Add Office
            </button>
            <button className="btn btn-secondary" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h3>Office List</h3>
        </div>
        <div className="table-container">
          <table className="table-responsive">
            <thead>
              <tr>
                <th>#</th>
                <th>OFFICE NAME</th>
                <th>CITY</th>
                <th>COUNTRY</th>
                <th>ADDRESS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {offices.map((office) => (
                <tr key={office.id}>
                  <td>{office.id}</td>
                  <td>{office.name}</td>
                  <td>{office.city}</td>
                  <td>{office.country}</td>
                  <td>{office.address}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn action-btn-edit" title="Edit">
                        <Edit2 size={14} />
                      </button>
                      <button 
                        className="action-btn action-btn-delete" 
                        title="Delete"
                        onClick={() => handleDeleteOffice(office.id)}
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
