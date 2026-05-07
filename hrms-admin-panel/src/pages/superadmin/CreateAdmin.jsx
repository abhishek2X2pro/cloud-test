'use client';

import { useState } from 'react'
import { Send } from 'lucide-react'

export default function CreateAdmin() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    role: 'ADMIN',
    phone: '',
  })

  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.firstName && formData.email && formData.company) {
      console.log('Admin created:', formData)
      setSuccess(true)
      setFormData({ firstName: '', lastName: '', email: '', company: '', role: 'ADMIN', phone: '' })
      setTimeout(() => setSuccess(false), 3000)
    }
  }

  return (
    <div>
      <div className="page-header">
        <h2>Create Admin</h2>
        <p>Add a new admin to manage a company.</p>
      </div>

      {success && (
        <div style={{
          backgroundColor: '#dcfce7',
          border: '1px solid var(--success-green)',
          color: 'var(--success-green)',
          padding: '12px',
          borderRadius: '6px',
          marginBottom: '20px',
          fontSize: '14px',
        }}>
          ✓ Admin created successfully!
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h3>Admin Information</h3>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '30px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            <div className="filter-group">
              <label>First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                required
              />
            </div>

            <div className="filter-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
              />
            </div>

            <div className="filter-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                required
              />
            </div>

            <div className="filter-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>

            <div className="filter-group">
              <label>Company *</label>
              <select name="company" value={formData.company} onChange={handleChange} required>
                <option value="">Select a company</option>
                <option value="RJIT BSF">RJIT BSF</option>
                <option value="Tech Solutions">Tech Solutions</option>
                <option value="Digital World">Digital World</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Role</label>
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="ADMIN">Admin</option>
                <option value="SUPER_ADMIN">Super Admin</option>
              </select>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', display: 'flex', gap: '10px' }}>
            <button type="submit" className="btn btn-primary">
              <Send size={18} />
              Create Admin
            </button>
            <button type="reset" className="btn btn-secondary">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
