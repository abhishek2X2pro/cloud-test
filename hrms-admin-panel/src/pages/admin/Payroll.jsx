export default function Payroll() {
  const payrollData = [
    { id: 1, name: 'John Doe', month: 'January 2026', presentDays: 22, leaves: 2, salary: '₹50,000', status: 'Paid' },
    { id: 2, name: 'Jane Smith', month: 'January 2026', presentDays: 21, leaves: 3, salary: '₹55,000', status: 'Paid' },
    { id: 3, name: 'Mike Johnson', month: 'January 2026', presentDays: 20, leaves: 4, salary: '₹48,000', status: 'Pending' },
    { id: 4, name: 'Sarah Williams', month: 'January 2026', presentDays: 23, leaves: 1, salary: '₹52,000', status: 'Paid' },
    { id: 5, name: 'Robert Brown', month: 'January 2026', presentDays: 22, leaves: 2, salary: '₹49,000', status: 'Pending' },
  ]

  return (
    <div>
      <div className="page-header">
        <h2>Payroll</h2>
        <p>View and manage employee payroll information.</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Payroll Records</h3>
          <button className="btn btn-primary btn-sm">Generate Payslip</button>
        </div>
        <div className="table-container">
          <table className="table-responsive">
            <thead>
              <tr>
                <th>#</th>
                <th>NAME</th>
                <th>MONTH</th>
                <th>PRESENT DAYS</th>
                <th>LEAVES</th>
                <th>SALARY</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {payrollData.map((record) => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.name}</td>
                  <td>{record.month}</td>
                  <td>{record.presentDays}</td>
                  <td>{record.leaves}</td>
                  <td>{record.salary}</td>
                  <td>
                    <span className={`status-badge status-${record.status.toLowerCase()}`}>
                      {record.status}
                    </span>
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
