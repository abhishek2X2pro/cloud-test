'use client';

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'

export default function Attendance() {
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    employee: '',
    status: '',
  })

  const [attendanceData, setAttendanceData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/attendance/recent?limit=100`)
        const result = await response.json()
        
        if (result.success && result.data) {
          setAttendanceData(result.data)
        } else {
          setAttendanceData([])
        }
      } catch (err) {
        console.error('Error fetching attendance data:', err)
        setAttendanceData([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchAttendance()
  }, [])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = () => {
    console.log('Filters applied:', filters)
  }

  const handleClear = () => {
    setFilters({
      fromDate: '',
      toDate: '',
      employee: '',
      status: '',
    })
  }

  return (
    <div>
      <div className="page-header">
        <h2>Attendance</h2>
        <p>View and manage employee attendance records.</p>
      </div>



      <div className="filter-section">
        <div className="filter-row">
          <div className="filter-group">
            <label>FROM DATE</label>
            <input
              type="text"
              name="fromDate"
              value={filters.fromDate}
              onChange={handleFilterChange}
              placeholder="DD/MM/YYYY"
            />
          </div>
          <div className="filter-group">
            <label>TO DATE</label>
            <input
              type="text"
              name="toDate"
              value={filters.toDate}
              onChange={handleFilterChange}
              placeholder="DD/MM/YYYY"
            />
          </div>
          <div className="filter-group" style={{ minWidth: 'auto' }}>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          <div className="filter-group" style={{ minWidth: 'auto' }}>
            <button className="btn btn-secondary" onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Attendance Records</h3>
        </div>
        <div className="table-container">
          <table className="table-responsive">
            <thead>
              <tr>
                <th>#</th>
                <th>DATE</th>
                <th>NAME</th>
                <th>PUNCH-IN</th>
                <th>PUNCH-OUT</th>
                <th>LUNCH DURATION</th>
                <th>TOTAL HOURS</th>
                <th>CLOCKED TIME</th>
                <th>PAID TIME</th>
                <th>BREAK TIME</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="10" className="text-center py-4">Loading attendance records...</td></tr>
              ) : attendanceData.length > 0 ? (
                attendanceData.map((record, index) => (
                  <tr key={record.id || index}>
                  <td>{index + 1}</td>
                  <td>{record.date || '-'}</td>
                  <td>{record.employee || '-'}</td>
                  <td>{record.time || '-'}</td>
                  <td>{record.punchOutTime || '-'}</td>
                  <td>-</td>
                  <td>{record.duration || '-'}</td>
                  <td>{record.duration || '-'}</td>
                  <td>{record.duration || '-'}</td>
                  <td>-</td>
                </tr>
                ))
              ) : (
                <tr><td colSpan="10" className="text-center py-4">No records found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
