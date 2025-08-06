@echo off
echo Cleaning up project folders...
echo.

echo Removing frontend node_modules...
if exist "frontend\node_modules" (
    echo Attempting to remove frontend node_modules...
    rmdir /s /q "frontend\node_modules" 2>nul
    if exist "frontend\node_modules" (
        echo WARNING: Could not remove frontend node_modules completely.
        echo You may need to close any programs using these files.
    ) else (
        echo Frontend node_modules removed successfully.
    )
) else (
    echo Frontend node_modules not found.
)

echo.
echo Removing frontend .next folder...
if exist "frontend\.next" (
    rmdir /s /q "frontend\.next" 2>nul
    echo Frontend .next folder removed.
) else (
    echo Frontend .next folder not found.
)

echo.
echo Removing backend node_modules...
if exist "backend\node_modules" (
    echo Attempting to remove backend node_modules...
    rmdir /s /q "backend\node_modules" 2>nul
    if exist "backend\node_modules" (
        echo WARNING: Could not remove backend node_modules completely.
        echo You may need to close any programs using these files.
    ) else (
        echo Backend node_modules removed successfully.
    )
) else (
    echo Backend node_modules not found.
)

echo.
echo Cleanup complete!
echo.
echo Next steps:
echo 1. Upload your project to GitHub (without node_modules and .next folders)
echo 2. Clone the repository on another machine
echo 3. Run 'npm install' in both frontend and backend folders
echo.
pause 