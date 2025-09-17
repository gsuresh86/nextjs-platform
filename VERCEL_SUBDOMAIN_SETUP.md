# Vercel Subdomain Setup Guide

## Overview

Support custom subdomains like `harly.tvarly.vercel.app` using Vercel's built-in subdomain functionality.

## How It Works

### Customer Journey
1. **Customer creates subdomain**: `harly` via admin app
2. **Customer visits**: `harly.tvarly.vercel.app`
3. **Vercel routes**: Automatically to your tenant app
4. **Middleware detects**: `harly` subdomain
5. **Redis lookup**: Finds tenant data for `harly`
6. **Tenant app serves**: Custom page for Harly's business

### Flow Diagram
```
harly.tvarly.vercel.app
         ↓
    Vercel Routing
         ↓
    Tenant App
         ↓
    Middleware
         ↓
    Redis Lookup
         ↓
    Custom Page
```

## 1. Deploy Tenant App

### Deploy to Vercel
```bash
# Deploy tenant app
cd apps/tenant
vercel --prod

# This will give you: https://tvarly.vercel.app
```

### Environment Variables
Set in Vercel dashboard:
```bash
NEXT_PUBLIC_ROOT_DOMAIN=tvarly.vercel.app
UPSTASH_REDIS_REST_URL=your-redis-url
UPSTASH_REDIS_REST_TOKEN=your-redis-token
```

## 2. Vercel Configuration

### Automatic Subdomain Support
Vercel automatically supports subdomains for your app:
- `tvarly.vercel.app` → Main app
- `harly.tvarly.vercel.app` → Customer subdomain
- `sarah.tvarly.vercel.app` → Another customer subdomain

### No DNS Configuration Needed
Unlike custom domains, Vercel subdomains work automatically:
- No DNS setup required
- No CNAME records needed
- No domain verification required

## 3. Testing Subdomains

### Local Testing
Add to `/etc/hosts`:
```
127.0.0.1 harly.localhost
127.0.0.1 sarah.localhost
```

Test locally:
- `http://harly.localhost:3000`
- `http://sarah.localhost:3000`

### Production Testing
1. Create subdomain via admin app
2. Test: `https://harly.tvarly.vercel.app`

## 4. Customer Instructions

### For Customers
Send this to your customers:

```
Your custom subdomain is ready!

Visit: https://harly.tvarly.vercel.app

This is your personalized business page. You can share this URL
with your customers and use it for your business.

No setup required - it works immediately!
```

## 5. Benefits of Vercel Subdomains

✅ **No DNS Setup**: Works immediately
✅ **Automatic SSL**: Vercel handles certificates
✅ **Fast Deployment**: No domain verification delays
✅ **Easy Management**: All subdomains in one place
✅ **Cost Effective**: No additional domain costs
✅ **Reliable**: Vercel's infrastructure handles everything

## 6. Example Subdomains

### Customer Subdomains
- `harly.tvarly.vercel.app` → Harly's business
- `sarah.tvarly.vercel.app` → Sarah's business
- `mike.tvarly.vercel.app` → Mike's business
- `studio.tvarly.vercel.app` → Studio business

### Reserved Subdomains
- `tvarly.vercel.app` → Main app
- `www.tvarly.vercel.app` → Main app
- `admin.tvarly.vercel.app` → Admin app (if deployed separately)

## 7. Admin App Integration

### Deploy Admin App Separately
```bash
# Deploy admin app
cd apps/admin
vercel --prod

# This will give you: https://admin-tvarly.vercel.app
```

### Access Admin
- Admin app: `https://admin-tvarly.vercel.app`
- Create subdomains: `https://admin-tvarly.vercel.app`
- Manage subdomains: `https://admin-tvarly.vercel.app/admin`

## 8. Customization

### Tenant Page Customization
Each customer gets a personalized page:
- Custom emoji
- Business name
- Creation date
- Customizable content

### Branding
- Each subdomain shows customer's emoji
- "Powered by tvarly.vercel.app" link
- Professional business page layout

## 9. Monitoring

### Vercel Analytics
- Track subdomain usage
- Monitor performance
- Set up alerts

### Custom Analytics
```javascript
// Track subdomain visits
gtag('event', 'subdomain_visit', {
  subdomain: 'harly',
  vercel_subdomain: true
});
```

## 10. Scaling

### Adding More Subdomains
- No limit on number of subdomains
- Each customer gets their own URL
- Easy to manage through admin app

### Performance
- Vercel's CDN handles all subdomains
- Fast global delivery
- Automatic scaling

## 11. Troubleshooting

### Common Issues

#### Subdomain Not Working
- Check if subdomain exists in Redis
- Verify middleware is working
- Check Vercel logs

#### SSL Issues
- Vercel handles SSL automatically
- May take a few minutes to provision
- Check Vercel dashboard for status

### Debug Commands
```bash
# Test subdomain
curl https://harly.tvarly.vercel.app

# Check Redis data
redis-cli GET "subdomain:harly"
```

## 12. Migration from Custom Domains

If you later want to support custom domains:

1. Add custom domain in Vercel
2. Update `NEXT_PUBLIC_ROOT_DOMAIN`
3. Configure DNS records
4. Both will work simultaneously

## Example Customer Experience

### Harly's Journey
1. **Visits admin**: `https://admin-tvarly.vercel.app`
2. **Creates subdomain**: `harly` with emoji 🎨
3. **Gets URL**: `https://harly.tvarly.vercel.app`
4. **Shares with customers**: Professional business page
5. **No setup required**: Works immediately

### Benefits for Harly
- Professional business URL
- Custom branding with emoji
- No technical setup
- Fast and reliable
- Easy to share
