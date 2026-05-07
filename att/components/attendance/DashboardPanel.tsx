'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

export default function DashboardPanel() {
    return (
        <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-1">Dashboard Overview</h2>
                <p className="text-muted-foreground">Welcome back! Here's your personalized employee dashboard</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-primary/10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-foreground">Today's Schedule</h3>
                            <p className="text-lg font-bold mt-0.5">9:00 AM - 6:00 PM</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-secondary/10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-foreground">Attendance Status</h3>
                            <p className="text-lg font-bold mt-0.5 text-secondary">Present</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-muted/5 to-muted/10 rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-muted/10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-foreground">Leave Balance</h3>
                            <p className="text-lg font-bold mt-0.5">12 days</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 mb-8 border border-border">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-foreground">Recent Activity</h3>
                    <Button variant="outline" className="px-4 py-2">
                        View All
                    </Button>
                </div>

                <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 hover:bg-muted/50 rounded-lg transition-colors">
                        <div className="mt-1 flex-shrink-0 w-3 h-3 rounded-full bg-green-500"></div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">Personal Task</p>
                            <p className="text-sm text-muted-foreground mt-1">Completed yesterday</p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">2 days ago</span>
                    </div>

                    <div className="flex items-start gap-4 p-4 hover:bg-muted/50 rounded-lg transition-colors">
                        <div className="mt-1 flex-shrink-0 w-3 h-3 rounded-full bg-blue-500"></div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">Meeting Reminder</p>
                            <p className="text-sm text-muted-foreground mt-1">Tomorrow at 10:00 AM</p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">Today</span>
                    </div>

                    <div className="flex items-start gap-4 p-4 hover:bg-muted/50 rounded-lg transition-colors">
                        <div className="mt-1 flex-shrink-0 w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">Pending Approval</p>
                            <p className="text-sm text-muted-foreground mt-1">Leave request submitted</p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">3 days ago</span>
                    </div>

                    <div className="flex items-start gap-4 p-4 hover:bg-muted/50 rounded-lg transition-colors">
                        <div className="mt-1 flex-shrink-0 w-3 h-3 rounded-full bg-purple-500"></div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">Project Update</p>
                            <p className="text-sm text-muted-foreground mt-1">New milestone reached</p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">1 day ago</span>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 mb-8 border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <div className="bg-muted/50 rounded-xl p-5 text-center hover:bg-accent/50 transition-colors cursor-pointer group">
                        <div className="mx-auto w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary w-6 h-6">
                                <path d="M14 2v4"></path>
                                <path d="M18 2v4"></path>
                                <path d="M22 22v-4"></path>
                                <path d="M22 14v-4"></path>
                                <path d="M2 18h4"></path>
                                <path d="M2 14h4"></path>
                                <path d="M2 10h4"></path>
                                <path d="M2 6h4"></path>
                                <path d="M6 2h4"></path>
                                <path d="M10 22h4"></path>
                                <path d="M14 18h4"></path>
                                <path d="M18 18h4"></path>
                                <path d="M18 14h4"></path>
                            </svg>
                        </div>
                        <p className="text-sm font-medium">Attendance</p>
                    </div>

                    <div className="bg-muted/50 rounded-xl p-5 text-center hover:bg-accent/50 transition-colors cursor-pointer group">
                        <div className="mx-auto w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary w-6 h-6">
                                <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"></path>
                                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                                <circle cx="9" cy="10" r="1"></circle>
                                <circle cx="15" cy="10" r="1"></circle>
                                <path d="M7 14c.5 2 1.5 3 3 3s2.5-1 3-3"></path>
                            </svg>
                        </div>
                        <p className="text-sm font-medium">Profile</p>
                    </div>

                    <div className="bg-muted/50 rounded-xl p-5 text-center hover:bg-accent/50 transition-colors cursor-pointer group">
                        <div className="mx-auto w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary w-6 h-6">
                                <path d="M19 7c0-5.333-2.667-7-7-7S5 1.667 5 7"></path>
                                <path d="M12 7v14"></path>
                                <path d="M5 7v14"></path>
                                <path d="M19 7v14"></path>
                            </svg>
                        </div>
                        <p className="text-sm font-medium">Leave</p>
                    </div>

                    <div className="bg-muted/50 rounded-xl p-5 text-center hover:bg-accent/50 transition-colors cursor-pointer group">
                        <div className="mx-auto w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary w-6 h-6">
                                <path d="M2 3h20"></path>
                                <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"></path>
                                <path d="M7 21h10"></path>
                                <path d="M12 17v4"></path>
                            </svg>
                        </div>
                        <p className="text-sm font-medium">Reports</p>
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-6">Announcements & Updates</h3>

                <div className="space-y-4">
                    <div className="p-5 border border-border rounded-xl hover:border-primary/30 transition-colors">
                        <div className="flex items-start gap-3">
                            <div className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-primary"></div>
                            <div className="flex-1">
                                <h4 className="font-semibold mb-1 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="8" x2="12" y2="12"></line>
                                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                    </svg>
                                    Office Closure Notice
                                </h4>
                                <p className="text-sm text-muted-foreground mb-2">The office will be closed on Jan 25 for maintenance. Please plan your work accordingly.</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-muted-foreground">Posted: 2 days ago</span>
                                    <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">Notice</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 border border-border rounded-xl hover:border-primary/30 transition-colors">
                        <div className="flex items-start gap-3">
                            <div className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-secondary"></div>
                            <div className="flex-1">
                                <h4 className="font-semibold mb-1 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
                                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                                    </svg>
                                    New Policy Update
                                </h4>
                                <p className="text-sm text-muted-foreground mb-2">Remote work policy has been updated. Please review the changes in your employee handbook.</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-muted-foreground">Posted: 1 week ago</span>
                                    <span className="text-xs px-2 py-1 rounded bg-secondary/10 text-secondary">Policy</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}