import React from 'react';

const DashboardPanel = () => {
    return (
        <div className="flex-1 overflow-y-auto px-10 py-8">
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-foreground">Dashboard</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-card rounded-lg p-6 border border-border">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Welcome Back!</h3>
                    <p className="text-sm text-muted-foreground">Here's your personal overview</p>
                </div>

                <div className="bg-card rounded-lg p-6 border border-border">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Your Work Schedule</h3>
                    <p className="text-sm text-muted-foreground">Today: 9:00 AM - 6:00 PM</p>
                </div>

                <div className="bg-card rounded-lg p-6 border border-border">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Leave Balance</h3>
                    <p className="text-sm text-muted-foreground">Annual: 12 days remaining</p>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 mb-8 border border-border">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-foreground">Recent Activity</h3>
                    <button className="px-4 py-2 border border-input rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                        View All
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 hover:bg-muted rounded-md transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="font-medium">Personal Task</span>
                        </div>
                        <span className="text-sm text-muted-foreground">Completed yesterday</span>
                    </div>

                    <div className="flex items-center justify-between p-3 hover:bg-muted rounded-md transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span className="font-medium">Meeting Reminder</span>
                        </div>
                        <span className="text-sm text-muted-foreground">Tomorrow at 10:00 AM</span>
                    </div>

                    <div className="flex items-center justify-between p-3 hover:bg-muted rounded-md transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                            <span className="font-medium">Pending Approval</span>
                        </div>
                        <span className="text-sm text-muted-foreground">Leave request submitted</span>
                    </div>

                    <div className="flex items-center justify-between p-3 hover:bg-muted rounded-md transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                            <span className="font-medium">Project Update</span>
                        </div>
                        <span className="text-sm text-muted-foreground">New milestone reached</span>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 mb-8 border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-6">Quick Access</h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-muted rounded-lg p-4 text-center hover:bg-accent transition-colors cursor-pointer">
                        <div className="mx-auto w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-2">
                            <span className="text-primary-foreground font-bold">AT</span>
                        </div>
                        <p className="text-sm font-medium">Attendance</p>
                    </div>

                    <div className="bg-muted rounded-lg p-4 text-center hover:bg-accent transition-colors cursor-pointer">
                        <div className="mx-auto w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-2">
                            <span className="text-primary-foreground font-bold">PR</span>
                        </div>
                        <p className="text-sm font-medium">Profile</p>
                    </div>

                    <div className="bg-muted rounded-lg p-4 text-center hover:bg-accent transition-colors cursor-pointer">
                        <div className="mx-auto w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-2">
                            <span className="text-primary-foreground font-bold">LV</span>
                        </div>
                        <p className="text-sm font-medium">Leave</p>
                    </div>

                    <div className="bg-muted rounded-lg p-4 text-center hover:bg-accent transition-colors cursor-pointer">
                        <div className="mx-auto w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-2">
                            <span className="text-primary-foreground font-bold">RP</span>
                        </div>
                        <p className="text-sm font-medium">Reports</p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-6">Announcements</h3>

                <div className="space-y-4">
                    <div className="p-4 border border-border rounded-lg">
                        <h4 className="font-medium mb-1">Office Closure Notice</h4>
                        <p className="text-sm text-muted-foreground">The office will be closed on Jan 25 for maintenance.</p>
                        <p className="text-xs text-muted-foreground mt-2">Posted: 2 days ago</p>
                    </div>

                    <div className="p-4 border border-border rounded-lg">
                        <h4 className="font-medium mb-1">New Policy Update</h4>
                        <p className="text-sm text-muted-foreground">Remote work policy has been updated. Please review.</p>
                        <p className="text-xs text-muted-foreground mt-2">Posted: 1 week ago</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPanel;