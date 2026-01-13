#!/bin/bash

echo "🚀 Deploy başladı..."

# --- Backend ---
echo "🔹 Backend üçün..."
cd /var/www/BePositive.az/backend || exit

if [ -f ".env.production" ]; then
    cp .env.production .env
    echo "✅ Backend env yükləndi"
else
    echo "⚠️ Backend .env.production tapılmadı"
fi

npm install

if pm2 list | grep -q "BePositive-backend"; then
    pm2 restart BePositive-backend --update-env
    echo "🔄 Backend PM2 restart edildi"
else
    pm2 start server.js --name BePositive-backend
    echo "✅ Backend PM2 start edildi"
fi

# --- Frontend ---
echo "🔹 Frontend üçün..."
cd /var/www/BePositive.az/client || exit

if [ -f ".env.production" ]; then
    cp .env.production .env
    echo "✅ Frontend env yükləndi"
else
    echo "⚠️ Frontend .env.production tapılmadı"
fi

npm install
npm run build
echo "✅ Frontend build tamamlandı"

if pm2 list | grep -q "BePositive-frontend"; then
    pm2 restart BePositive-frontend
    echo "🔄 Frontend PM2 restart edildi"
else
    pm2 start npm --name BePositive-frontend -- start
    echo "✅ Frontend PM2 start edildi"
fi

echo "🚀 Deploy tamamlandı! PM2 listə baxmaq üçün: pm2 list"
