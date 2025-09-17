# Custom Domain Setup for Tenant App

## Overview

Deploy tenant app to `tvarly.vercel.app` and support custom domains like `harly.tvarly.com` pointing directly to the tenant app.

## 1. Deploy Tenant App

### Deploy to Vercel
```bash
# Deploy tenant app
cd apps/tenant
vercel --prod

# This will give you: https://tvarly.vercel.app
```

### Configure Environment Variables
In Vercel dashboard, set:
```bash
NEXT_PUBLIC_ROOT_DOMAIN=tvarly.com
UPSTASH_REDIS_REST_URL=your-redis-url
UPSTASH_REDIS_REST_TOKEN=your-redis-token
```

## 2. Configure Custom Domains in Vercel

### Add Wildcard Domain
1. Go to Vercel Dashboard
2. Select your tenant app project
3. Go to Settings → Domains
4. Add domain: `*.tvarly.com`
5. Vercel will provide DNS records to configure

### DNS Configuration
Add these DNS records to your domain registrar:

```
Type: CNAME
Name: *.tvarly.com
Value: tvarly.vercel.app
```

Or if using A records:
```
Type: A
Name: *.tvarly.com
Value: 76.76.19.61 (Vercel's IP)
```

## 3. Customer Subdomain Setup

### For Each Customer Subdomain

#### Option A: CNAME Record (Recommended)
Customer adds to their DNS:
```
Type: CNAME
Name: harly.tvarly.com
Value: tvarly.vercel.app
```

#### Option B: A Record
Customer adds to their DNS:
```
Type: A
Name: harly.tvarly.com
Value: 76.76.19.61
```

## 4. How It Works

### Customer Journey
1. **Customer visits**: `harly.tvarly.com`
2. **DNS resolves**: To `tvarly.vercel.app`
3. **Vercel routes**: To your tenant app
4. **Middleware detects**: `harly` subdomain
5. **Redis lookup**: Finds tenant data for `harly`
6. **Tenant app serves**: Custom page for Harly's business

### Flow Diagram
```
harly.tvarly.com
       ↓
   DNS Resolution
       ↓
tvarly.vercel.app
       ↓
   Tenant App
       ↓
   Middleware
       ↓
   Redis Lookup
       ↓
   Custom Page
```

## 5. Testing Custom Domains

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
2. Configure DNS for customer subdomain
3. Test: `https://harly.tvarly.com`

## 6. Vercel Configuration

### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "apps/tenant/package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "apps/tenant/$1"
    }
  ]
}
```

### Environment Variables
```bash
# Required
NEXT_PUBLIC_ROOT_DOMAIN=tvarly.com
UPSTASH_REDIS_REST_URL=your-redis-url
UPSTASH_REDIS_REST_TOKEN=your-redis-token

# Optional
VERCEL_URL=tvarly.vercel.app
VERCEL_ENV=production
```

## 7. Customer Instructions

### For Customers Setting Up Custom Domains

Send this to your customers:

```
To set up your custom subdomain (e.g., harly.tvarly.com):

1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Add a CNAME record:
   - Name: harly (or your subdomain)
   - Value: tvarly.vercel.app
3. Wait 5-10 minutes for DNS propagation
4. Visit your subdomain: https://harly.tvarly.com

If you need help, contact our support team.
```

## 8. Benefits

✅ **Direct Access**: Customers visit their subdomain directly
✅ **No Redirects**: Seamless experience
✅ **Custom Branding**: Each customer gets their own domain
✅ **SEO Friendly**: Each subdomain is a separate site
✅ **Scalable**: Easy to add more customer subdomains
✅ **Professional**: Customers get their own branded URL

## 9. Troubleshooting

### Common Issues

#### DNS Not Working
- Check DNS propagation: https://dnschecker.org
- Wait 24-48 hours for full propagation
- Verify CNAME record is correct

#### Subdomain Not Found
- Check if subdomain exists in Redis
- Verify middleware is working
- Check Vercel logs for errors

#### SSL Certificate Issues
- Vercel automatically handles SSL for custom domains
- May take a few minutes to provision
- Check Vercel dashboard for certificate status

### Debug Commands
```bash
# Check DNS resolution
nslookup harly.tvarly.com

# Test subdomain
curl -H "Host: harly.tvarly.com" https://tvarly.vercel.app

# Check Redis data
redis-cli GET "subdomain:harly"
```

## 10. Monitoring

### Vercel Analytics
- Monitor subdomain usage
- Track performance metrics
- Set up alerts for errors

### Custom Analytics
```javascript
// Track subdomain visits
gtag('event', 'subdomain_visit', {
  subdomain: 'harly',
  custom_domain: true
});
```
