# Deployment Guide for TVARLY.com

## Vercel Configuration

### 1. Environment Variables
Set these in your Vercel dashboard:

```bash
# Domain Configuration
NEXT_PUBLIC_ROOT_DOMAIN=tvarly.com

# Redis Configuration (Upstash)
UPSTASH_REDIS_REST_URL=your-redis-url
UPSTASH_REDIS_REST_TOKEN=your-redis-token

# Vercel Configuration
VERCEL_URL=your-vercel-url
VERCEL_ENV=production
```

### 2. Domain Setup
Your current Vercel domains:
- `www.tvarly.com` → Main website
- `business.tvarly.com` → Business app
- `platform.tvarly.com` → Platform app

### 3. Customer Subdomain Flow

When a customer creates a subdomain like `harly.tvarly.com`:

1. **DNS**: Customer points `harly.tvarly.com` to your Vercel deployment
2. **Middleware**: Detects `harly` as a customer subdomain
3. **Redis Lookup**: Finds tenant data for `harly`
4. **Redirect**: Redirects to `business.tvarly.com?tenant=harly&tenant_emoji=🎨&tenant_created=1234567890`

### 4. Business App Integration

In your business app (`business.tvarly.com`), you can access tenant info:

```javascript
// Get tenant info from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const tenant = urlParams.get('tenant');
const tenantEmoji = urlParams.get('tenant_emoji');
const tenantCreated = urlParams.get('tenant_created');

// Or from server-side
export async function getServerSideProps(context) {
  const { tenant, tenant_emoji, tenant_created } = context.query;
  
  return {
    props: {
      tenant,
      tenantEmoji: tenant_emoji,
      tenantCreated: tenant_created
    }
  };
}
```

### 5. Deployment Steps

1. **Deploy Tenant App** (handles subdomain resolution):
   ```bash
   # Deploy to Vercel
   vercel --prod
   ```

2. **Configure Custom Domains**:
   - Add `*.tvarly.com` as a wildcard domain
   - This will catch all customer subdomains

3. **Test Customer Subdomain**:
   - Create subdomain via admin app
   - Test: `harly.tvarly.com` → redirects to `business.tvarly.com?tenant=harly`

### 6. DNS Configuration

For customer subdomains to work, customers need to:

1. **CNAME Record**: Point their subdomain to your Vercel deployment
   ```
   harly.tvarly.com CNAME your-vercel-deployment.vercel.app
   ```

2. **Or A Record**: Point to Vercel's IP addresses

### 7. Admin App Deployment

Deploy the admin app separately for subdomain management:

```bash
# Deploy admin app
cd apps/admin
vercel --prod
```

Access admin at: `admin.tvarly.com` or a separate domain.

## Example Customer Journey

1. **Customer visits**: `harly.tvarly.com`
2. **Middleware detects**: `harly` subdomain
3. **Redis lookup**: Finds tenant data for `harly`
4. **Redirect**: `business.tvarly.com?tenant=harly&tenant_emoji=🎨`
5. **Business app**: Shows personalized content for Harly's business

## Benefits

- ✅ **Seamless Integration**: Works with existing Vercel setup
- ✅ **Customer Branding**: Each customer gets their own subdomain
- ✅ **Centralized Management**: All subdomains managed through admin app
- ✅ **Scalable**: Easy to add more customer subdomains
- ✅ **Flexible**: Can redirect to different apps based on tenant type
