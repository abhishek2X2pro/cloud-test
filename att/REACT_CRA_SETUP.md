# RJIT BSF Attendance Portal - React CRA Clone

This is a pure React Create React App (CRA) clone of the RJIT BSF Attendance Portal UI.

## Project Structure

```
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx     # Navigation sidebar
│   │   ├── Header.jsx      # Top header with time display
│   │   ├── AttendancePanel.jsx  # Main attendance panel
│   │   └── AttendanceTable.jsx  # Data table
│   ├── App.jsx             # Main app component
│   ├── App.css             # All styling
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies
└── README.md
```

## Features

✅ Sidebar navigation with 10 menu items
✅ Dynamic time display in header (updates every second)
✅ Attendance portal with punch in/out functionality
✅ Date filter with submit/clear buttons
✅ Attendance data table with 9 columns
✅ Responsive design for mobile and tablet
✅ Clean, modern UI matching the original design

## Installation & Setup

### Option 1: Use Existing React CRA

If you have an existing React CRA project:

1. Copy all files from `src/` to your `src/` directory:
   ```bash
   cp -r src/* your-project/src/
   ```

2. Copy `public/index.html` to your project's public folder

3. No additional dependencies needed! Uses only React and React DOM

4. Start the development server:
   ```bash
   npm start
   ```

### Option 2: Create New React CRA with These Files

1. Navigate to this folder (which contains all the files)

2. Create a new React app:
   ```bash
   npx create-react-app .
   ```

3. The component files are already in the correct structure

4. Install dependencies:
   ```bash
   npm install
   ```

5. Start development server:
   ```bash
   npm start
   ```

## File Organization for CRA

For a fresh CRA setup, organize files like this:

```
src/
├── components/
│   ├── Sidebar.jsx
│   ├── Header.jsx
│   ├── AttendancePanel.jsx
│   └── AttendanceTable.jsx
├── App.jsx
├── App.css
├── index.js
└── index.css
```

## Styling

All styling uses plain CSS (no CSS-in-JS, no Tailwind). The color scheme:
- **Primary Blue:** #1e5cc8
- **Light Gray:** #f5f5f5
- **Border Gray:** #e0e0e0
- **Dark Text:** #333333

## Components Overview

### Sidebar
- Fixed left sidebar with logo and menu items
- Active menu state tracking
- Icon + label for each menu item
- Responsive collapsing on mobile

### Header
- Live time display (updates every second)
- Notification bell with badge
- User profile button (AJ)
- Settings icon

### AttendancePanel
- Large "Proceed To Punch Out" button
- Date range filter (FROM DATE, TO DATE)
- Submit and Clear buttons
- Integration with AttendanceTable

### AttendanceTable
- 9 columns: #, DATE, PUNCH-IN, PUNCH-OUT, LUNCH DURATION, TOTAL HOURS, CLOCKED TIME, PAID TIME, BREAK TIME
- 3 sample rows of attendance data
- Hover effects on rows
- Responsive scrolling on small screens

## Customization

### Change Colors
Edit the `:root` CSS variables in `App.css`:
```css
:root {
  --primary-blue: #1e5cc8;
  --light-gray: #f5f5f5;
  /* ... more colors ... */
}
```

### Add More Menu Items
Edit the `menuItems` array in `Sidebar.jsx`

### Update Attendance Data
Modify the `attendanceData` array in `AttendanceTable.jsx`

### Connect to Backend
Use `fetch()` or `axios` in `AttendancePanel.jsx` to submit forms and fetch data from your API

## Browser Support

Works on all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Notes

- No external libraries required (pure React)
- Minimal CSS for fast load times
- Optimized re-renders with proper state management
- Live time updates use `setInterval` with cleanup

## Future Enhancements

- Add date picker library for better date inputs
- Connect to backend API
- Add export to CSV functionality
- Implement real-time punch in/out
- Add authentication
- Add dark mode support

---

**Created with React 18+**
