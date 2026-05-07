'use client';

import { BarChart3, FileText, Download } from 'lucide-react'

export default function Reports() {
  const reportTypes = [
    { id: 1, name: 'Monthly Attendance Report', icon: BarChart3, description: 'Summary of attendance for the month' },
    { id: 2, name: 'Leave Summary Report', icon: FileText, description: 'Overview of all leave requests' },
    { id: 3, name: 'Payroll Report', icon: FileText, description: 'Detailed payroll information' },
    { id: 4, name: 'Performance Report', icon: BarChart3, description: 'Employee performance analytics' },
  ]

  const generatedReports = [
    { id: 1, name: 'Attendance Report - December 2025', date: '15 Jan 2026', type: 'Attendance' },
    { id: 2, name: 'Payroll Report - December 2025', date: '10 Jan 2026', type: 'Payroll' },
    { id: 3, name: 'Leave Summary - 2025', date: '05 Jan 2026', type: 'Leave' },
  ]

  const handleGenerateReport = (reportName) => {
    console.log('Generating report:', reportName)
  }

  const handleDownload = (reportId) => {
    console.log('Downloading report:', reportId)
  }

  return (
    <div>
      <div className="page-header">
        <h2>Reports</h2>
        <p>Generate and download various reports.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        {reportTypes.map((report) => {
          const Icon = report.icon
          return (
            <div key={report.id} className="card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '15px' }}>
                <Icon size={24} style={{ color: 'var(--primary-blue)' }} />
                <h4 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>{report.name}</h4>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-light)', margin: '0 0 15px 0' }}>
                {report.description}
              </p>
              <button 
                className="btn btn-primary btn-sm" 
                style={{ width: '100%' }}
                onClick={() => handleGenerateReport(report.name)}
              >
                Generate Report
              </button>
            </div>
          )
        })}
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Recently Generated Reports</h3>
        </div>
        <div className="table-container">
          <table className="table-responsive">
            <thead>
              <tr>
                <th>#</th>
                <th>REPORT NAME</th>
                <th>TYPE</th>
                <th>GENERATED DATE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {generatedReports.map((report) => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>{report.name}</td>
                  <td>{report.type}</td>
                  <td>{report.date}</td>
                  <td>
                    <button 
                      className="action-btn action-btn-edit" 
                      style={{ padding: '6px 10px', display: 'flex', alignItems: 'center', gap: '6px' }}
                      onClick={() => handleDownload(report.id)}
                    >
                      <Download size={14} />
                      Download
                    </button>
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
