import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';

export default function LeaveManagement() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaveData();
  }, []);

  const fetchLeaveData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/leave/all`);
      const result = await response.json();

      if (result.success) {
        setLeaves(result.data);
      } else {
        setError(result.message || 'Failed to fetch leave data');
      }
    } catch (err) {
      console.error('Error fetching leaves:', err);
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (leaveId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/leave/update-status/${leaveId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'approved' })
      });

      const result = await response.json();

      if (result.success) {
        // Update the local state
        setLeaves(prev => prev.map(leave =>
          leave._id === leaveId ? { ...leave, status: 'approved' } : leave
        ));
        alert('Leave approved successfully!');
      } else {
        alert(result.message || 'Failed to approve leave');
      }
    } catch (err) {
      console.error('Error approving leave:', err);
      alert('Failed to connect to server');
    }
  };

  const handleReject = async (leaveId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/leave/update-status/${leaveId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'rejected' })
      });

      const result = await response.json();

      if (result.success) {
        // Update the local state
        setLeaves(prev => prev.map(leave =>
          leave._id === leaveId ? { ...leave, status: 'rejected' } : leave
        ));
        alert('Leave rejected successfully!');
      } else {
        alert(result.message || 'Failed to reject leave');
      }
    } catch (err) {
      console.error('Error rejecting leave:', err);
      alert('Failed to connect to server');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading leave requests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-red-500">
          <p>Error: {error}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={fetchLeaveData}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h2>Leave Management</h2>
        <p>Review and manage employee leave requests.</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Leave Requests ({leaves.length})</h3>
        </div>
        <div className="table-container">
          <table className="table-responsive">
            <thead>
              <tr>
                <th>#</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>FROM</th>
                <th>TO</th>
                <th>TYPE</th>
                <th>REASON</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {leaves.length > 0 ? (
                leaves.map((leave, index) => (
                  <tr key={leave._id || index}>
                    <td>{index + 1}</td>
                    <td>{leave.userName}</td>
                    <td>{leave.email}</td>
                    <td>{new Date(leave.startDate).toLocaleDateString('en-GB')}</td>
                    <td>{new Date(leave.endDate).toLocaleDateString('en-GB')}</td>
                    <td>{leave.leaveType}</td>
                    <td>{leave.reason}</td>
                    <td>
                      <span className={`status-badge status-${leave.status.toLowerCase()}`}>
                        {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        {leave.status === 'pending' && (
                          <>
                            <button
                              className="action-btn action-btn-approve"
                              title="Approve"
                              onClick={() => handleApprove(leave._id)}
                            >
                              <Check size={14} />
                            </button>
                            <button
                              className="action-btn action-btn-reject"
                              title="Reject"
                              onClick={() => handleReject(leave._id)}
                            >
                              <X size={14} />
                            </button>
                          </>
                        )}
                        {leave.status !== 'pending' && (
                          <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>-</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-4">No leave requests found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
