@echo off
echo Starting StaffPortal Development Server...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed or not in PATH.
    echo.
    echo Please install Node.js from https://nodejs.org/
    echo Or use Python server instead: python -m http.server 3000
    echo.
    pause
    exit /b 1
)

REM Check if server.js exists
if not exist "server.js" (
    echo ERROR: server.js not found!
    pause
    exit /b 1
)

echo Starting server on http://localhost:3000
echo Press Ctrl+C to stop the server
echo.

node server.js

pause

