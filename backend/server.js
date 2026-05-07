const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/attendance_db';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        console.log('Running in memory mode - data will not persist');
    });

// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

// Attendance Schema
const attendanceSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    workMode: {
        type: String,
        enum: ['WFH', 'WFO'],
        required: true
    },
    punchInTime: {
        type: Date,
        default: Date.now
    },
    punchOutTime: {
        type: Date
    },
    totalDuration: {
        type: Number // Duration in milliseconds
    },
    date: {
        type: Date,
        default: () => new Date().setHours(0, 0, 0, 0)
    }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

// Leave Schema
const leaveSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    leaveType: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    appliedDate: {
        type: Date,
        default: Date.now
    }
});

const Leave = mongoose.model('Leave', leaveSchema);

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Attendance Backend Server Running' });
});

// Punch In API
app.post('/api/punch-in', async (req, res) => {
    try {
        const { userId, userName, email, workMode } = req.body;

        // Validate required fields
        if (!userId || !userName || !email || !workMode) {
            return res.status(400).json({
                success: false,
                message: 'userId, userName, email, and workMode are required'
            });
        }

        // Validate workMode
        if (!['WFH', 'WFO'].includes(workMode)) {
            return res.status(400).json({
                success: false,
                message: 'workMode must be either WFH or WFO'
            });
        }

        // Check if user already punched in today (timezone adjusted)
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Also set the date field properly
        const dateForRecord = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const existingPunch = await Attendance.findOne({
            userId: userId,
            date: {
                $gte: today,
                $lt: tomorrow
            }
        });

        if (existingPunch) {
            return res.status(400).json({
                success: false,
                message: 'User has already punched in today'
            });
        }

        // Create new attendance record
        const newAttendance = new Attendance({
            userId,
            userName,
            email,
            workMode,
            punchInTime: new Date(),
            date: dateForRecord
        });

        const savedAttendance = await newAttendance.save();

        res.status(201).json({
            success: true,
            message: 'Punch in successful',
            data: savedAttendance
        });

    } catch (error) {
        console.error('Punch in error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Get all attendance records
app.get('/api/attendance', async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find().sort({ punchInTime: -1 });
        res.json({
            success: true,
            data: attendanceRecords
        });
    } catch (error) {
        console.error('Get attendance error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Debug endpoint to check attendance records
app.get('/api/attendance/debug/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Get today's date range
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Find all records for this user today
        const records = await Attendance.find({
            userId: userId,
            date: {
                $gte: today,
                $lt: tomorrow
            }
        });

        // Find active punch-in record (no punch-out yet)
        const activeRecord = await Attendance.findOne({
            userId: userId,
            date: {
                $gte: today,
                $lt: tomorrow
            },
            punchOutTime: { $exists: false }
        });

        res.json({
            success: true,
            todayRecords: records,
            activeRecord: activeRecord,
            todayRange: { today: today.toISOString(), tomorrow: tomorrow.toISOString() }
        });
    } catch (error) {
        console.error('Debug attendance error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Get attendance by user
app.get('/api/attendance/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        // Use userId to match the _id in the database
        const attendanceRecords = await Attendance.find({ userId: userId }).sort({ punchInTime: -1 });
        res.json({
            success: true,
            data: attendanceRecords
        });
    } catch (error) {
        console.error('Get user attendance error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Get recent attendance records for admin dashboard
app.get('/api/attendance/recent', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const recentRecords = await Attendance.find()
            .sort({ punchInTime: -1 })
            .limit(limit);

        // Transform data for dashboard display
        const dashboardData = recentRecords.map((record, index) => {
            // Format duration if available
            let durationText = '-';
            if (record.totalDuration && record.punchOutTime) {
                const durationHours = Math.floor(record.totalDuration / (1000 * 60 * 60));
                const durationMinutes = Math.floor((record.totalDuration % (1000 * 60 * 60)) / (1000 * 60));
                durationText = `${durationHours}h ${durationMinutes}m`;
            }

            return {
                id: index + 1,
                employee: record.userName, // Use the stored user name
                action: record.punchOutTime ? `Punched Out (${record.workMode})` : `Punched In (${record.workMode})`,
                time: new Date(record.punchInTime).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                }),
                date: new Date(record.punchInTime).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }),
                punchOutTime: record.punchOutTime ?
                    new Date(record.punchOutTime).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    }) : '-',
                duration: durationText,
                workMode: record.workMode,
                punchInTime: record.punchInTime
            };
        });

        res.json({
            success: true,
            data: dashboardData
        });
    } catch (error) {
        console.error('Get recent attendance error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// User Registration API
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and password are required'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        // Create new user
        const newUser = new User({
            name,
            email,
            password
        });

        const savedUser = await newUser.save();

        // Return user data (excluding password)
        const userResponse = {
            _id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email
        };

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: userResponse
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// User Login API
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check password (simple comparison for now, no hashing)
        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Return user data (excluding password)
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email
        };

        res.json({
            success: true,
            message: 'Login successful',
            data: userResponse
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});



// Punch Out API
app.post('/api/punch-out', async (req, res) => {
    try {
        const { userId } = req.body;

        // Validate required fields
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'userId is required'
            });
        }

        console.log('Punch out request for userId:', userId);

        // Find today's punch-in record for this user (timezone adjusted)
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        console.log('Date range:', { today: today.toISOString(), tomorrow: tomorrow.toISOString() });

        // First, let's see all records for this user today
        const allTodayRecords = await Attendance.find({
            userId: userId,
            date: {
                $gte: today,
                $lt: tomorrow
            }
        });

        console.log('All today records:', allTodayRecords);

        const punchInRecord = await Attendance.findOne({
            userId: userId,
            date: {
                $gte: today,
                $lt: tomorrow
            },
            punchOutTime: { $exists: false } // Hasn't punched out yet
        });

        console.log('Active punch-in record found:', punchInRecord);

        if (!punchInRecord) {
            // Let's check if there are any records at all
            if (allTodayRecords.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'No punch-in record found for today. Please punch in first.'
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'You have already punched out today, or no active punch-in record found.'
                });
            }
        }

        // Calculate duration
        const punchOutTime = new Date();
        const durationMs = punchOutTime.getTime() - punchInRecord.punchInTime.getTime();

        // Update the attendance record with punch-out time and duration
        punchInRecord.punchOutTime = punchOutTime;
        punchInRecord.totalDuration = durationMs;

        const updatedAttendance = await punchInRecord.save();

        res.json({
            success: true,
            message: 'Punch out successful',
            data: updatedAttendance
        });

    } catch (error) {
        console.error('Punch out error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Leave Application API
app.post('/api/leave/apply', async (req, res) => {
    try {
        const { userId, leaveType, startDate, endDate, reason } = req.body;

        // Validate required fields
        if (!userId || !leaveType || !startDate || !endDate || !reason) {
            return res.status(400).json({
                success: false,
                message: 'userId, leaveType, startDate, endDate, and reason are required'
            });
        }

        // Validate dates
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({
                success: false,
                message: 'Invalid date format'
            });
        }

        if (end < start) {
            return res.status(400).json({
                success: false,
                message: 'End date cannot be before start date'
            });
        }

        // Get user details
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Create leave application
        const newLeave = new Leave({
            userId: user._id.toString(),
            userName: user.name,
            email: user.email,
            leaveType,
            startDate: start,
            endDate: end,
            reason,
            status: 'pending',
            appliedDate: new Date()
        });

        const savedLeave = await newLeave.save();

        res.status(201).json({
            success: true,
            message: 'Leave application submitted successfully',
            data: savedLeave
        });

    } catch (error) {
        console.error('Leave application error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Get leave applications for a specific user
app.get('/api/leave/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const leaveApplications = await Leave.find({ userId: userId }).sort({ appliedDate: -1 });

        res.json({
            success: true,
            data: leaveApplications
        });
    } catch (error) {
        console.error('Get user leaves error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Get all leave applications (for admin panel)
app.get('/api/leave/all', async (req, res) => {
    try {
        const leaveApplications = await Leave.find().sort({ appliedDate: -1 });

        res.json({
            success: true,
            data: leaveApplications
        });
    } catch (error) {
        console.error('Get all leaves error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Update leave status (approve/reject) - for admin panel
app.put('/api/leave/update-status/:leaveId', async (req, res) => {
    try {
        const { leaveId } = req.params;
        const { status, updatedBy } = req.body; // updatedBy could be admin ID

        // Validate required fields
        if (!status || !['approved', 'rejected'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Status is required and must be either approved or rejected'
            });
        }

        // Find and update the leave application
        const updatedLeave = await Leave.findByIdAndUpdate(
            leaveId,
            { status: status },
            { new: true } // Return updated document
        );

        if (!updatedLeave) {
            return res.status(404).json({
                success: false,
                message: 'Leave application not found'
            });
        }

        res.json({
            success: true,
            message: `Leave application ${status} successfully`,
            data: updatedLeave
        });

    } catch (error) {
        console.error('Update leave status error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Get today's leaves (for user panel)
app.get('/api/leave/today', async (req, res) => {
    try {
        // Get today's date range
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // Find all leaves that overlap with today
        const todaysLeaves = await Leave.find({
            status: 'approved',
            $and: [
                { startDate: { $lte: endOfDay } },
                { endDate: { $gte: startOfDay } }
            ]
        });

        // Transform the data for the UI
        const transformedLeaves = todaysLeaves.map(leave => ({
            employeeName: leave.userName,
            leaveType: leave.leaveType,
            reason: leave.reason,
            status: leave.status
        }));

        res.json({
            success: true,
            data: transformedLeaves
        });
    } catch (error) {
        console.error('Get today leaves error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Get Dashboard Stats
app.get('/api/dashboard/stats', async (req, res) => {
    try {
        const totalEmployees = await User.countDocuments();
        
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const presentUsers = await Attendance.distinct('userId', {
            date: { $gte: startOfDay, $lte: endOfDay }
        });
        const presentToday = presentUsers.length;

        const leavesToday = await Leave.countDocuments({
            status: 'approved',
            $and: [
                { startDate: { $lte: endOfDay } },
                { endDate: { $gte: startOfDay } }
            ]
        });

        const absentToday = totalEmployees - presentToday - leavesToday;

        res.json({
            success: true,
            data: {
                totalEmployees,
                presentToday,
                absentToday: absentToday < 0 ? 0 : absentToday,
                onLeave: leavesToday
            }
        });
    } catch (error) {
        console.error('Stats error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});