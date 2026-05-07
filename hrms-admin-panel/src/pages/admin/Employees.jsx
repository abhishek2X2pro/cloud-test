import { Trash2, Edit2 } from 'lucide-react'

export default function Employees() {
  const employeesData = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Software Engineer', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Product Manager', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike.johnson@example.com', role: 'Designer', status: 'Active' },
    { id: 4, name: 'Sarah Williams', email: 'sarah.williams@example.com', role: 'HR Manager', status: 'Inactive' },
    { id: 5, name: 'Robert Brown', email: 'robert.brown@example.com', role: 'Developer', status: 'Active' },
    { id: 6, name: 'Emily Davis', email: 'emily.davis@example.com', role: 'Analyst', status: 'Active' },
  ]

  return (
    <div>
      <div className="page-header">
        <h2>Employees</h2>
        <p>Manage employee information and records.</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Employee List</h3>
          <button className="btn btn-primary btn-sm">+ Add Employee</button>
        </div>
        <div className="table-container">
          <table className="table-responsive">
            <thead>
              <tr>
                <th>#</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ROLE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {employeesData.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.role}</td>
                  <td>
                    <span className={`status-badge status-${emp.status.toLowerCase()}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn action-btn-edit" title="Edit">
                        <Edit2 size={14} />
                      </button>
                      <button className="action-btn action-btn-delete" title="Delete">
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
