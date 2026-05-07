'use client';

import React, { useState, useEffect } from 'react';

interface AttendanceRecord {
  _id: string;
  userId: string;
  email: string;
  workMode: string;
  punchInTime: string;
  punchOutTime?: string;
  totalDuration?: number;
  date: string;
}

export default function AttendanceTable({ refreshTrigger = 0 }: { refreshTrigger?: number }) {
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendanceData();
  }, [refreshTrigger]);

  const fetchAttendanceData = async () => {
    try {
      // Get user data from localStorage
      const userDataString = localStorage.getItem('userData');
      if (!userDataString) {
        console.error('User not authenticated');
        // Fallback to static data if not authenticated
        setAttendanceData(getStaticData());
        setLoading(false);
        return;
      }

      const userData = JSON.parse(userDataString);

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/attendance/user/${userData._id}`);
      const result = await response.json();

      if (result.success) {
        setAttendanceData(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch attendance data:', error);
      // Fallback to static data if API fails
      setAttendanceData(getStaticData());
    } finally {
      setLoading(false);
    }
  };

  const getStaticData = (): AttendanceRecord[] => [
    {
      _id: '1',
      userId: 'user123',
      email: 'user@example.com',
      workMode: 'WFO',
      punchInTime: '2026-01-15T11:18:13.000Z',
      punchOutTime: '2026-01-15T18:30:45.000Z',
      totalDuration: 25942000, // ~7 hours 12 minutes
      date: '2026-01-15T00:00:00.000Z',
    },
    {
      _id: '2',
      userId: 'user123',
      email: 'user@example.com',
      workMode: 'WFH',
      punchInTime: '2026-01-16T11:53:56.000Z',
      punchOutTime: '2026-01-16T17:45:20.000Z',
      totalDuration: 21084000, // ~5 hours 51 minutes
      date: '2026-01-16T00:00:00.000Z',
    },
    {
      _id: '3',
      userId: 'user123',
      email: 'user@example.com',
      workMode: 'WFO',
      punchInTime: '2026-01-19T11:03:57.000Z',
      punchOutTime: '2026-01-19T19:08:15.000Z',
      totalDuration: 29058000, // ~8 hours 5 minutes
      date: '2026-01-19T00:00:00.000Z',
    },
    {
      _id: '4',
      userId: 'user123',
      email: 'user@example.com',
      workMode: 'WFH',
      punchInTime: '2026-01-20T10:45:30.000Z',
      punchOutTime: '2026-01-20T18:30:45.000Z',
      totalDuration: 27915000, // ~7 hours 45 minutes
      date: '2026-01-20T00:00:00.000Z',
    },
    {
      _id: '5',
      userId: 'user123',
      email: 'user@example.com',
      workMode: 'WFO',
      punchInTime: '2026-01-21T09:30:00.000Z',
      punchOutTime: '2026-01-21T18:00:00.000Z',
      totalDuration: 30600000, // ~8 hours 30 minutes
      date: '2026-01-21T00:00:00.000Z',
    },
    {
      _id: '6',
      userId: 'user123',
      email: 'user@example.com',
      workMode: 'WFH',
      punchInTime: '2026-01-22T10:15:20.000Z',
      punchOutTime: '2026-01-22T18:45:10.000Z',
      totalDuration: 30590000, // ~8 hours 29 minutes
      date: '2026-01-22T00:00:00.000Z',
    },
  ];

  if (loading) {
    return (
      <div className="border border-border rounded-lg overflow-hidden bg-card p-8 text-center">
        <p className="text-muted-foreground">Loading attendance data...</p>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted border-b border-border">
              <th className="px-4 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider border-r border-border">
                #
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider border-r border-border">
                Date
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider border-r border-border">
                Punch-In
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider border-r border-border">
                Punch-Out
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider border-r border-border">
                Work Mode
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider border-r border-border">
                Total Hours
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider border-r border-border">
                Clocked Time
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider border-r border-border">
                Paid Time
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Break Time
              </th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((record, index) => {
              // Calculate duration if available
              let durationStr = 'N/A';
              if (record.totalDuration) {
                const durationHours = Math.floor(record.totalDuration / (1000 * 60 * 60));
                const durationMinutes = Math.floor((record.totalDuration % (1000 * 60 * 60)) / (1000 * 60));
                durationStr = `${durationHours}h ${durationMinutes}m`;
              }

              return (
                <tr key={record._id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-4 text-sm text-foreground border-r border-border">{index + 1}</td>
                  <td className="px-4 py-4 text-sm text-foreground border-r border-border">
                    {new Date(record.date).toLocaleDateString('en-GB')}
                  </td>
                  <td className="px-4 py-4 text-sm text-foreground border-r border-border">
                    {new Date(record.punchInTime).toLocaleTimeString('en-US', { hour12: false })}
                  </td>
                  <td className="px-4 py-4 text-sm text-foreground border-r border-border">
                    {record.punchOutTime ? new Date(record.punchOutTime).toLocaleTimeString('en-US', { hour12: false }) : 'N/A'}
                  </td>
                  <td className="px-4 py-4 text-sm text-foreground border-r border-border">{record.workMode}</td>
                  <td className="px-4 py-4 text-sm text-foreground border-r border-border">{durationStr}</td>
                  <td className="px-4 py-4 text-sm text-foreground border-r border-border">00:00:00</td>
                  <td className="px-4 py-4 text-sm text-foreground border-r border-border">00:00:00</td>
                  <td className="px-4 py-4 text-sm text-foreground">00:00:00</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}