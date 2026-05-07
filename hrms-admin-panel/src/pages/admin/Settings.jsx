'use client';

import { useState } from 'react'
import { Save } from 'lucide-react'

export default function Settings() {
  const [settings, setSettings] = useState({
    companyName: 'RJIT BSF',
    email: 'admin@rjitbsf.com',
    phone: '+91 9876543210',
    address: '123 Business Street, City, State',
    workingHours: '09:00 - 18:00',
    weekendPolicy: 'Saturday-Sunday',
    overtimeRate: '1.5x',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = () => {
    console.log('Settings saved:', settings)
    alert('Settings saved successfully!')
  }

  return (
    <div>
      <div className="page-header">
        <h2>Settings</h2>
        <p>Configure organization and system settings.</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Organization Settings</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', padding: '20px' }}>
          <div className="filter-group">
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              value={settings.companyName}
              onChange={handleChange}
            />
          </div>

          <div className="filter-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
            />
          </div>

          <div className="filter-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={settings.phone}
              onChange={handleChange}
            />
          </div>

          <div className="filter-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={settings.address}
              onChange={handleChange}
            />
          </div>

          <div className="filter-group">
            <label>Working Hours</label>
            <input
              type="text"
              name="workingHours"
              value={settings.workingHours}
              onChange={handleChange}
              placeholder="HH:MM - HH:MM"
            />
          </div>

          <div className="filter-group">
            <label>Weekend Policy</label>
            <input
              type="text"
              name="weekendPolicy"
              value={settings.weekendPolicy}
              onChange={handleChange}
            />
          </div>

          <div className="filter-group">
            <label>Overtime Rate</label>
            <input
              type="text"
              name="overtimeRate"
              value={settings.overtimeRate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div style={{ padding: '20px', borderTop: '1px solid var(--border-color)' }}>
          <button className="btn btn-primary" onClick={handleSave}>
            <Save size={18} />
            Save Settings
          </button>
        </div>
      </div>

      <div className="card" style={{ marginTop: '30px' }}>
        <div className="card-header">
          <h3>System Settings</h3>
        </div>

        <div style={{ padding: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Notifications</h4>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked />
              <span>Enable email notifications</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginTop: '8px' }}>
              <input type="checkbox" defaultChecked />
              <span>Enable SMS notifications</span>
            </label>
          </div>

          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Data Settings</h4>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked />
              <span>Backup data weekly</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
