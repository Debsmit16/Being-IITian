# Being IITian - Quick Setup Script

Write-Host "🚀 Being IITian Backend Setup" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# Check if .env exists
if (Test-Path ".env") {
    Write-Host "✅ .env file found" -ForegroundColor Green
} else {
    Write-Host "⚠️  .env file not found. Creating from template..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "📝 Please edit .env file with your Supabase credentials" -ForegroundColor Yellow
    Write-Host "   - NEXT_PUBLIC_SUPABASE_URL" -ForegroundColor Gray
    Write-Host "   - NEXT_PUBLIC_SUPABASE_ANON_KEY" -ForegroundColor Gray
    Write-Host "   - SUPABASE_SERVICE_ROLE_KEY" -ForegroundColor Gray
    Write-Host "   - DATABASE_URL" -ForegroundColor Gray
    Write-Host "   - DIRECT_URL`n" -ForegroundColor Gray
    
    $continue = Read-Host "Have you filled in the .env file? (y/n)"
    if ($continue -ne "y") {
        Write-Host "❌ Please fill in .env file first, then run this script again" -ForegroundColor Red
        exit
    }
}

Write-Host "`n📦 Step 1: Installing dependencies..." -ForegroundColor Cyan
npm install

Write-Host "`n🔧 Step 2: Generating Prisma Client..." -ForegroundColor Cyan
npx prisma generate

Write-Host "`n📊 Step 3: Pushing schema to database..." -ForegroundColor Cyan
npx prisma db push

Write-Host "`n✨ Setup Complete!" -ForegroundColor Green
Write-Host "================================`n" -ForegroundColor Green

Write-Host "🎯 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Run 'npm run dev' to start the development server" -ForegroundColor White
Write-Host "2. Open 'npx prisma studio' to view your database" -ForegroundColor White
Write-Host "3. Test the API endpoints at http://localhost:3001/api/auth/*" -ForegroundColor White
Write-Host "`n📚 Read BACKEND_SETUP.md for detailed instructions`n" -ForegroundColor Gray
