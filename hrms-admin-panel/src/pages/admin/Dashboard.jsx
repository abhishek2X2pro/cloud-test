import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dashboardStats, setDashboardStats] = useState([
    { label: 'Total Employees', value: '...', className: 'blue' },
    { label: 'Present Today', value: '...', className: 'green' },
    { label: 'Absent Today', value: '...', className: 'red' },
    { label: 'On Leave', value: '...', className: 'orange' },
  ]);

  // Fetch recent attendance data from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/dashboard/stats`);
        const result = await response.json();
        if (result.success && result.data) {
          setDashboardStats([
            { label: 'Total Employees', value: result.data.totalEmployees.toString(), className: 'blue' },
            { label: 'Present Today', value: result.data.presentToday.toString(), className: 'green' },
            { label: 'Absent Today', value: result.data.absentToday.toString(), className: 'red' },
            { label: 'On Leave', value: result.data.onLeave.toString(), className: 'orange' },
          ]);
        }
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
      }
    };

    const fetchRecentActivity = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/attendance/recent?limit=10`);
        const result = await response.json();

        if (result.success) {
          setRecentActivity(result.data);
        } else {
          // Fallback to static data if API fails
          setRecentActivity([
            { id: 1, employee: 'John Doe', action: 'Punched In (WFO)', time: '09:00 AM', date: '20 Jan 2026', punchOutTime: '06:00 PM', duration: '9h 0m' },
            { id: 2, employee: 'Jane Smith', action: 'Punched Out (WFH)', time: '09:30 AM', date: '20 Jan 2026', punchOutTime: '05:30 PM', duration: '8h 0m' },
            { id: 3, employee: 'Mike Johnson', action: 'Punched In (WFO)', time: '10:00 AM', date: '20 Jan 2026', punchOutTime: '07:15 PM', duration: '9h 15m' },
            { id: 4, employee: 'Sarah Williams', action: 'Punched Out (WFH)', time: '08:45 AM', date: '20 Jan 2026', punchOutTime: '06:15 PM', duration: '9h 30m' },
            { id: 5, employee: 'Robert Brown', action: 'Punched In (WFO)', time: '09:15 AM', date: '20 Jan 2026', punchOutTime: '05:45 PM', duration: '8h 30m' },
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch recent activity:', error);
        // Fallback to static data on error
        setRecentActivity([
          { id: 1, employee: 'John Doe', action: 'Punched In (WFO)', time: '09:00 AM', date: '20 Jan 2026', punchOutTime: '06:00 PM', duration: '9h 0m' },
          { id: 2, employee: 'Jane Smith', action: 'Punched Out (WFH)', time: '09:30 AM', date: '20 Jan 2026', punchOutTime: '05:30 PM', duration: '8h 0m' },
          { id: 3, employee: 'Mike Johnson', action: 'Punched In (WFO)', time: '10:00 AM', date: '20 Jan 2026', punchOutTime: '07:15 PM', duration: '9h 15m' },
          { id: 4, employee: 'Sarah Williams', action: 'Punched Out (WFH)', time: '08:45 AM', date: '20 Jan 2026', punchOutTime: '06:15 PM', duration: '9h 30m' },
          { id: 5, employee: 'Robert Brown', action: 'Punched In (WFO)', time: '09:15 AM', date: '20 Jan 2026', punchOutTime: '05:45 PM', duration: '8h 30m' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    fetchRecentActivity();
  }, []);

  const getActionClass = (action) => {
    if (action.includes('WFH')) return 'status-punch-in-wfh';
    if (action.includes('WFO')) return 'status-punch-in-wfo';
    if (action.includes('Punched Out')) return 'status-punch-out';
    return 'status-punch-in';
  };

  return (
    <div>
      <div className="page-header">
        <h2>Dashboard</h2>
        <p>Welcome back! Here's an overview of your organization's attendance.</p>
      </div>

      <div className="dashboard-grid">
        {dashboardStats.map((stat, idx) => (
          <div key={idx} className={`stat-card ${stat.className}`}>
            <h4>{stat.label}</h4>
            <div className="stat-value">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Recent Activity</h3>
        </div>
        <div className="table-container">
          <table className="table-responsive">
            <thead>
              <tr>
                <th>#</th>
                <th>Employee Name</th>
                <th>Action</th>
                <th>Punch In</th>
                <th>Punch Out</th>
                <th>Duration</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    Loading recent activity...
                  </td>
                </tr>
              ) : recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <tr key={`${activity.id}-${activity.punchInTime}`}>
                    <td>{activity.id}</td>
                    <td>{activity.employee}</td>
                    <td>
                      <span className={`status-badge ${getActionClass(activity.action)}`}>
                        {activity.action}
                      </span>
                    </td>
                    <td>{activity.time}</td>
                    <td>{activity.punchOutTime}</td>
                    <td>{activity.duration}</td>
                    <td>{activity.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No recent activity found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
