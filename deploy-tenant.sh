#!/bin/bash

# Deploy Tenant App to Vercel with Custom Domain Support

echo "🚀 Deploying Tenant App to Vercel..."

# Navigate to tenant app directory
cd apps/tenant

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the app
echo "🔨 Building app..."
npm run build

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Set environment variables in Vercel dashboard"
echo "2. Test with a customer subdomain"
echo "3. Create subdomain via admin app"
echo "4. Visit: https://harly.tvarly.vercel.app"
echo ""
echo "Your tenant app will be available at: https://tvarly.vercel.app"
echo "Customer subdomains will work automatically: https://harly.tvarly.vercel.app"
