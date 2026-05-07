import React from 'react';

const AttendanceTable = () => {
  const attendanceData = [
    {
      id: 1,
      date: '15-01-2026',
      punchIn: '11:18:13',
      punchOut: '20:22:19',
      lunchDuration: '00:00:00',
      totalHours: '09:04:06',
      clockedTime: '00:00:00',
      paidTime: '00:00:00',
      breakTime: '00:00:00',
    },
    {
      id: 2,
      date: '16-01-2026',
      punchIn: '11:53:56',
      punchOut: '20:55:21',
      lunchDuration: '00:00:00',
      totalHours: '09:01:25',
      clockedTime: '00:00:00',
      paidTime: '00:00:00',
      breakTime: '00:00:00',
    },
    {
      id: 3,
      date: '19-01-2026',
      punchIn: '11:03:57',
      punchOut: '20:08:08',
      lunchDuration: '00:00:00',
      totalHours: '09:04:11',
      clockedTime: '00:00:00',
      paidTime: '00:00:00',
      breakTime: '00:00:00',
    },
      {
      id: 4,
      date: '19-01-2026',
      punchIn: '11:03:57',
      punchOut: '20:08:08',
      lunchDuration: '00:00:00',
      totalHours: '09:04:11',
      clockedTime: '00:00:00',
      paidTime: '00:00:00',
      breakTime: '00:00:00',
    },
  ];

  return (
    <div className="table-container">
      <table className="attendance-table">
        <thead>
          <tr>
            <th>#</th>
            <th>DATE</th>
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
          {attendanceData.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.date}</td>
              <td>{record.punchIn}</td>
              <td>{record.punchOut}</td>
              <td>{record.lunchDuration}</td>
              <td>{record.totalHours}</td>
              <td>{record.clockedTime}</td>
              <td>{record.paidTime}</td>
              <td>{record.breakTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
