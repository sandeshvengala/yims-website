#!/bin/bash
# Replit startup script
echo "🚀 Starting YIMS Website on Replit..."
echo "📦 Installing dependencies..."
npm install

echo "⚙️ Starting frontend and backend..."
# Start backend in background
npm run server &
BACKEND_PID=$!

# Give backend 2 seconds to start
sleep 2

# Start frontend
npm run dev

# Cleanup
kill $BACKEND_PID 2>/dev/null
