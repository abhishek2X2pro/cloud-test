'use client';

import React, { useState, useEffect, useRef } from 'react';
import AttendanceTable from './AttendanceTable';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function AttendancePanel() {
  const [fromDate, setFromDate] = useState('15/01/2026');
  const [toDate, setToDate] = useState('20/01/2026');
  const [showWorkModeDialog, setShowWorkModeDialog] = useState(false);
  const [selectedWorkMode, setSelectedWorkMode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchInTime, setPunchInTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<string>('00:00:00');
  const [isPunchingOut, setIsPunchingOut] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSubmit = () => {
    console.log('Submitted:', { fromDate, toDate });
  };

  const handlePunchInClick = () => {
    if (isPunchedIn) {
      handlePunchOut();
    } else {
      setShowWorkModeDialog(true);
    }
  };

  const handleWorkModeSubmit = async () => {
    if (!selectedWorkMode) return;

    setIsLoading(true);
    try {
      // Get user data from localStorage
      const userDataString = localStorage.getItem('userData');
      if (!userDataString) {
        alert('User not authenticated');
        return;
      }

      const userData = JSON.parse(userDataString);

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/punch-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userData._id,
          userName: userData.name,
          email: userData.email,
          workMode: selectedWorkMode
        })
      });

      const result = await response.json();

      if (result.success) {
        alert('Punch in successful!');
        setShowWorkModeDialog(false);
        setSelectedWorkMode('');
        setIsPunchedIn(true);
        const now = Date.now();
        setPunchInTime(now);
        // Reset elapsed time
        setElapsedTime('00:00:00');

        // Store active punch session in localStorage
        const punchSession = {
          userId: userData._id,
          userName: userData.name,
          email: userData.email,
          workMode: selectedWorkMode,
          punchInTime: now,
          isActive: true
        };
        localStorage.setItem('activePunch', JSON.stringify(punchSession));

        // Update the table by incrementing the refresh trigger
        setRefreshTrigger(prev => prev + 1);
      } else {
        alert(result.message || 'Punch in failed');
      }
    } catch (error) {
      console.error('Punch in error:', error);
      alert('Failed to connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePunchOut = async () => {
    setIsPunchingOut(true);
    try {
      // Get user data from localStorage
      const userDataString = localStorage.getItem('userData');
      if (!userDataString) {
        alert('User not authenticated');
        return;
      }

      const userData = JSON.parse(userDataString);

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/punch-out`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userData._id,
        })
      });

      const result = await response.json();

      if (result.success) {
        alert('Punch out successful!');
        setIsPunchedIn(false);
        setPunchInTime(null);
        setElapsedTime('00:00:00');
        // Clear the timer
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        // Remove active punch session
        localStorage.removeItem('activePunch');

        // Update the table by incrementing the refresh trigger
        setRefreshTrigger(prev => prev + 1);
      } else {
        alert(result.message || 'Punch out failed');
      }
    } catch (error) {
      console.error('Punch out error:', error);
      alert('Failed to connect to server');
    } finally {
      setIsPunchingOut(false);
    }
  };

  // Initialize from localStorage on component mount
  useEffect(() => {
    const activePunch = localStorage.getItem('activePunch');
    if (activePunch) {
      const punchData = JSON.parse(activePunch);
      if (punchData.isActive) {
        // Verify this punch-in actually exists in database
        verifyPunchInRecord(punchData.userId);

        setIsPunchedIn(true);
        setPunchInTime(punchData.punchInTime);

        // Restart timer from when punch-in happened
        const now = Date.now();
        const elapsedMs = now - punchData.punchInTime;

        // Start timer with elapsed time
        timerRef.current = setInterval(() => {
          const currentTime = Date.now();
          const actualElapsed = currentTime - punchData.punchInTime;

          const hours = Math.floor(actualElapsed / (1000 * 60 * 60)).toString().padStart(2, '0');
          const minutes = Math.floor((actualElapsed % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
          const seconds = Math.floor((actualElapsed % (1000 * 60)) / 1000).toString().padStart(2, '0');

          setElapsedTime(`${hours}:${minutes}:${seconds}`);
        }, 1000);
      }
    }
  }, []);

  // Verify punch-in record exists in database
  const verifyPunchInRecord = async (userId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/attendance/debug/${userId}`);
      const result = await response.json();

      if (result.success) {
        // If no active record found, clear local state
        if (!result.activeRecord) {
          setIsPunchedIn(false);
          setPunchInTime(null);
          setElapsedTime('00:00:00');
          localStorage.removeItem('activePunch');
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
        }
      }
    } catch (error) {
      console.error('Error verifying punch-in record:', error);
    }
  };

  // Timer effect
  useEffect(() => {
    if (isPunchedIn && punchInTime) {
      // Clear any existing timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      // Start timer
      timerRef.current = setInterval(() => {
        const currentTime = Date.now();
        const elapsedMs = currentTime - punchInTime;

        const hours = Math.floor(elapsedMs / (1000 * 60 * 60)).toString().padStart(2, '0');
        const minutes = Math.floor((elapsedMs % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        const seconds = Math.floor((elapsedMs % (1000 * 60)) / 1000).toString().padStart(2, '0');

        setElapsedTime(`${hours}:${minutes}:${seconds}`);
      }, 1000);
    } else {
      // Clear timer if not punched in
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setElapsedTime('00:00:00');
      }
    }

    // Cleanup on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPunchedIn, punchInTime]);

  const handleClear = () => {
    setFromDate('');
    setToDate('');
  };

  return (
    <div className="flex-1 overflow-y-auto px-10 py-8">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-foreground">Attendance</h2>
      </div>

      {/* Timer Display */}
      {isPunchedIn && (
        <div className="mb-6 flex justify-center">
          <div className="bg-primary text-primary-foreground px-6 py-3 rounded-lg flex items-center gap-4">
            <span className="text-lg font-semibold">Elapsed Time:</span>
            <span className="text-2xl font-mono font-bold">{elapsedTime}</span>
          </div>
        </div>
      )}

      <div className="mb-10 flex justify-center">
        <Button
          onClick={handlePunchInClick}
          className="w-64 bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg font-semibold rounded-lg"
          disabled={isPunchingOut}
        >
          {isPunchingOut ? 'Processing...' : (isPunchedIn ? 'Punch Out' : 'Punch In')}
        </Button>
      </div>

      <div className="bg-card rounded-lg p-6 mb-8 border border-border">
        <div className="flex items-end gap-6">
          <div className="flex gap-6 flex-1">
            <div className="flex-1">
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
                From Date
              </label>
              <input
                type="text"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                placeholder="DD/MM/YYYY"
                className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex-1">
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
                To Date
              </label>
              <input
                type="text"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                placeholder="DD/MM/YYYY"
                className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleSubmit}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2"
            >
              Submit
            </Button>
            <Button
              onClick={handleClear}
              variant="outline"
              className="px-6 py-2 border-primary text-primary hover:bg-primary/5 bg-transparent"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>

      <AttendanceTable refreshTrigger={refreshTrigger} />

      {/* Work Mode Selection Dialog */}
      <Dialog open={showWorkModeDialog} onOpenChange={setShowWorkModeDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select Work Mode</DialogTitle>
            <DialogDescription>
              Please select your work mode for today
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <RadioGroup value={selectedWorkMode} onValueChange={setSelectedWorkMode}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="WFH" id="wfh" />
                <Label htmlFor="wfh">Work From Home (WFH)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="WFO" id="wfo" />
                <Label htmlFor="wfo">Work From Office (WFO)</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setShowWorkModeDialog(false);
                setSelectedWorkMode('');
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleWorkModeSubmit}
              disabled={!selectedWorkMode || isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
