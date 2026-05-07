'use client';

import React, { useState } from 'react';
import AttendanceTable from './AttendanceTable';

const AttendancePanel = () => {
  const [fromDate, setFromDate] = useState('15/01/2026');
  const [toDate, setToDate] = useState('20/01/2026');

  const handleSubmit = () => {
    console.log('Submitted:', { fromDate, toDate });
  };

  const handleClear = () => {
    setFromDate('');
    setToDate('');
  };

  return (
    <div className="attendance-panel">
      <div className="attendance-header">
        <h2>Attendance</h2>
      </div>

      <div className="punch-button-container flex justify-center">
        <button className="punch-button w-64">Punch In</button>
      </div>

      <div className="filter-section">
        <div className="date-inputs">
          <div className="date-group">
            <label>FROM DATE</label>
            <input
              type="text"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              placeholder="DD/MM/YYYY"
            />
          </div>

          <div className="date-group">
            <label>TO DATE</label>
            <input
              type="text"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              placeholder="DD/MM/YYYY"
            />
          </div>
        </div>

        <div className="filter-buttons">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
          <button className="btn btn-secondary" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>

      <AttendanceTable />
    </div>
  );
};

export default AttendancePanel;
