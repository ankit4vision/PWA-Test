# Running StaffPortal App Locally

Due to browser security restrictions (CORS), you cannot open the HTML files directly from the file system. You need to run a local web server.

## Quick Start Options

### Option 1: Node.js Server (Recommended)

If you have Node.js installed:

1. **Double-click** `start-server.bat` (Windows)
   OR
   **Run** `start-server.ps1` in PowerShell

2. Open your browser and go to: `http://localhost:3000`

3. Press `Ctrl+C` in the terminal to stop the server

### Option 2: Python Server

If you have Python installed:

1. Open terminal/command prompt in the project folder
2. Run: `python -m http.server 3000`
3. Open browser: `http://localhost:3000`
4. Press `Ctrl+C` to stop

### Option 3: VS Code Live Server

If you use VS Code:

1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 4: PHP Server

If you have PHP installed:

1. Open terminal in the project folder
2. Run: `php -S localhost:3000`
3. Open browser: `http://localhost:3000`

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, you can:
- Change the port in `server.js` (line 8: `const PORT = 3000;`)
- Or use a different port with Python: `python -m http.server 8080`

### Node.js Not Found

Download and install Node.js from: https://nodejs.org/

### Still Getting CORS Errors

Make sure you're accessing the app via `http://localhost:3000` and NOT via `file://` protocol.

## Default Login Credentials

- **Email:** director@onebeat.com
- **Password:** demo123

