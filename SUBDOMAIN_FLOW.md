# Customer Subdomain Flow

## How It Works

```
Customer visits: harly.tvarly.com
         ↓
    DNS Resolution
         ↓
    Vercel Deployment (Tenant App)
         ↓
    Middleware Detects Subdomain
         ↓
    Redis Lookup: "harly"
         ↓
    Found: {emoji: "🎨", createdAt: 1234567890}
         ↓
    Redirect to: business.tvarly.com?tenant=harly&tenant_emoji=🎨&tenant_created=1234567890
         ↓
    Business App Shows Personalized Content
```

## Detailed Steps

### 1. Customer Creates Subdomain
- Customer visits admin app
- Creates subdomain "harly" with emoji "🎨"
- Data stored in Redis: `subdomain:harly = {emoji: "🎨", createdAt: 1234567890}`

### 2. DNS Configuration
Customer configures DNS:
```
harly.tvarly.com CNAME your-vercel-deployment.vercel.app
```

### 3. Customer Visits Subdomain
- Customer visits `harly.tvarly.com`
- DNS resolves to your Vercel deployment
- Tenant app middleware runs

### 4. Middleware Processing
```javascript
// Detects subdomain "harly"
const subdomain = extractSubdomain(request); // "harly"

// Looks up in Redis
const tenantData = await getSubdomainData("harly");
// Returns: {emoji: "🎨", createdAt: 1234567890}

// Redirects to business app
return NextResponse.redirect(
  new URL(`https://business.tvarly.com?tenant=harly&tenant_emoji=🎨&tenant_created=1234567890`)
);
```

### 5. Business App Integration
Business app receives tenant info and shows personalized content:

```javascript
// URL: business.tvarly.com?tenant=harly&tenant_emoji=🎨&tenant_created=1234567890

const tenant = "harly";
const tenantEmoji = "🎨";
const tenantCreated = "1234567890";

// Show personalized content
return (
  <div>
    <h1>Welcome to {tenant}'s Business</h1>
    <div className="text-4xl">{tenantEmoji}</div>
    <p>Customer since: {new Date(tenantCreated).toLocaleDateString()}</p>
  </div>
);
```

## Your Current Setup Integration

### Existing Domains
- `www.tvarly.com` → Your main website
- `business.tvarly.com` → Your business app (where customers get redirected)
- `platform.tvarly.com` → Your platform app

### New Customer Subdomains
- `harly.tvarly.com` → Redirects to `business.tvarly.com?tenant=harly`
- `sarah.tvarly.com` → Redirects to `business.tvarly.com?tenant=sarah`
- `mike.tvarly.com` → Redirects to `business.tvarly.com?tenant=mike`

## Benefits

✅ **Customer Branding**: Each customer gets their own subdomain
✅ **Seamless Integration**: Works with your existing business app
✅ **Centralized Management**: All subdomains managed through admin app
✅ **Flexible**: Can redirect to different apps based on tenant type
✅ **Scalable**: Easy to add more customer subdomains

## Example Customer Journey

1. **Sarah** wants her own subdomain
2. **Admin creates**: `sarah.tvarly.com` with emoji 🎭
3. **Sarah configures DNS**: Points to your Vercel deployment
4. **Customer visits**: `sarah.tvarly.com`
5. **System redirects**: To `business.tvarly.com?tenant=sarah&tenant_emoji=🎭`
6. **Business app shows**: Personalized content for Sarah's business
