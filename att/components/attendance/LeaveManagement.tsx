'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, PlusIcon, UsersIcon } from 'lucide-react';

interface LeaveApplication {
    _id: string;
    userId: string;
    leaveType: string;
    startDate: string;
    endDate: string;
    reason: string;
    status: 'pending' | 'approved' | 'rejected';
    appliedDate: string;
}

interface TodaysLeave {
    employeeName: string;
    leaveType: string;
    reason: string;
    status: string;
}

export default function LeaveManagement() {
    const [activeTab, setActiveTab] = useState<'view' | 'apply'>('view');
    const [myLeaves, setMyLeaves] = useState<LeaveApplication[]>([]);
    const [todaysLeaves, setTodaysLeaves] = useState<TodaysLeave[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Apply Leave Form States
    const [leaveType, setLeaveType] = useState('casual');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch leave data
    useEffect(() => {
        fetchLeaveData();
    }, []);

    const fetchLeaveData = async () => {
        try {
            setIsLoading(true);
            const userDataString = localStorage.getItem('userData');
            if (!userDataString) {
                alert('User not authenticated');
                return;
            }

            const userData = JSON.parse(userDataString);

            // Fetch user's leave applications
            const myLeavesResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/leave/user/${userData._id}`);
            const myLeavesResult = await myLeavesResponse.json();
            if (myLeavesResult.success) {
                setMyLeaves(myLeavesResult.data);
            } else {
                console.error('Error fetching my leaves:', myLeavesResult.message);
            }

            // Fetch today's leaves
            const todaysLeavesResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/leave/today`);
            const todaysLeavesResult = await todaysLeavesResponse.json();
            if (todaysLeavesResult.success) {
                setTodaysLeaves(todaysLeavesResult.data);
            } else {
                console.error('Error fetching today\'s leaves:', todaysLeavesResult.message);
            }
        } catch (error) {
            console.error('Error fetching leave data:', error);
            alert('Failed to connect to server');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const userDataString = localStorage.getItem('userData');
            if (!userDataString) {
                alert('User not authenticated');
                return;
            }

            const userData = JSON.parse(userDataString);

            const leaveData = {
                userId: userData._id,
                leaveType,
                startDate,
                endDate: endDate || startDate,
                reason,
                status: 'pending',
                appliedDate: new Date().toISOString()
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/leave/apply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(leaveData)
            });

            const result = await response.json();

            if (result.success) {
                alert('Leave application submitted successfully!');
                setLeaveType('casual');
                setStartDate('');
                setEndDate('');
                setReason('');
                setActiveTab('view');
                fetchLeaveData(); // Refresh data
            } else {
                alert(result.message || 'Failed to submit leave application');
            }
        } catch (error) {
            console.error('Leave application error:', error);
            alert('Failed to connect to server');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'approved': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading leave data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-foreground">Leave Management</h2>
                <p className="text-muted-foreground mt-1">Manage your leaves and view team status</p>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-6 border-b border-border">
                <button
                    onClick={() => setActiveTab('view')}
                    className={`px-4 py-2 font-medium border-b-2 transition-colors ${activeTab === 'view'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                >
                    View Leaves
                </button>
                <button
                    onClick={() => setActiveTab('apply')}
                    className={`px-4 py-2 font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'apply'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                >
                    <PlusIcon className="w-4 h-4" />
                    Apply Leave
                </button>
            </div>

            {activeTab === 'view' ? (
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* Today's Leaves Section */}


                    {/* My Leave Applications */}
                    <Card className="border border-border">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold">My Leave Applications</CardTitle>
                            <CardDescription>
                                Your submitted leave requests and their status
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {myLeaves.length > 0 ? (
                                <div className="space-y-3">
                                    {myLeaves.map((leave) => (
                                        <div key={leave._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                                            <div className="mb-2 sm:mb-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium capitalize">{leave.leaveType} Leave</span>
                                                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(leave.status)}`}>
                                                        {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-1">{leave.reason}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-muted-foreground">
                                                    Applied: {new Date(leave.appliedDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                                    <p className="text-muted-foreground mb-2">No leave applications found</p>
                                    <Button onClick={() => setActiveTab('apply')} variant="outline" size="sm">
                                        Apply for Leave
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            ) : (
                /* Apply Leave Form */
                <div className="max-w-2xl mx-auto">
                    <Card className="border border-border">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl font-semibold">Apply for Leave</CardTitle>
                            <CardDescription>
                                Submit your leave request
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="leaveType" className="text-sm font-medium">
                                            Leave Type *
                                        </Label>
                                        <select
                                            id="leaveType"
                                            value={leaveType}
                                            onChange={(e) => setLeaveType(e.target.value)}
                                            className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                            required
                                        >
                                            <option value="casual">Casual Leave</option>
                                            <option value="sick">Sick Leave</option>
                                            <option value="annual">Annual Leave</option>
                                            <option value="maternity">Maternity</option>
                                            <option value="paternity">Paternity</option>
                                            <option value="bereavement">Bereavement</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="startDate" className="text-sm font-medium flex items-center gap-2">
                                            <CalendarIcon className="w-4 h-4" />
                                            Start Date *
                                        </Label>
                                        <Input
                                            id="startDate"
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="w-full"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="endDate" className="text-sm font-medium flex items-center gap-2">
                                        <CalendarIcon className="w-4 h-4" />
                                        End Date (Optional)
                                    </Label>
                                    <Input
                                        id="endDate"
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="w-full max-w-xs"
                                        min={startDate || undefined}
                                    />
                                    {!endDate && (
                                        <p className="text-xs text-muted-foreground">
                                            Single day leave if not specified
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="reason" className="text-sm font-medium">
                                        Reason for Leave *
                                    </Label>
                                    <Textarea
                                        id="reason"
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        placeholder="Brief reason for your leave..."
                                        className="min-h-20 resize-none text-sm"
                                        required
                                    />
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <Button
                                        type="submit"
                                        className="flex-1 bg-primary hover:bg-primary/90 py-2.5 font-medium rounded-lg transition-colors"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setActiveTab('view')}
                                        className="px-4 py-2.5 font-medium rounded-lg"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}