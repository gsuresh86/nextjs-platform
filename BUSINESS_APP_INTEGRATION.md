# Business App Integration Guide

## How to Integrate Tenant Data in Your Business App

When customers visit their subdomain (e.g., `harly.tvarly.com`), they get redirected to your business app with tenant information. Here's how to handle it:

### 1. URL Parameters Approach

When redirected, the URL will look like:
```
https://business.tvarly.com?tenant=harly&tenant_emoji=🎨&tenant_created=1234567890
```

#### Server-Side (Next.js)
```javascript
// pages/index.js or app/page.tsx
export async function getServerSideProps(context) {
  const { tenant, tenant_emoji, tenant_created } = context.query;
  
  if (tenant) {
    return {
      props: {
        tenant: {
          subdomain: tenant,
          emoji: tenant_emoji,
          createdAt: tenant_created
        }
      }
    };
  }
  
  return { props: {} };
}

export default function BusinessPage({ tenant }) {
  if (tenant) {
    return (
      <div>
        <h1>Welcome to {tenant.subdomain}'s Business</h1>
        <div className="text-4xl">{tenant.emoji}</div>
        <p>Customer since: {new Date(tenant.createdAt).toLocaleDateString()}</p>
      </div>
    );
  }
  
  return <div>Regular business page</div>;
}
```

#### Client-Side (React)
```javascript
import { useSearchParams } from 'next/navigation';

export default function BusinessPage() {
  const searchParams = useSearchParams();
  const tenant = searchParams.get('tenant');
  const tenantEmoji = searchParams.get('tenant_emoji');
  const tenantCreated = searchParams.get('tenant_created');

  if (tenant) {
    return (
      <div>
        <h1>Welcome to {tenant}'s Business</h1>
        <div className="text-4xl">{tenantEmoji}</div>
        <p>Customer since: {new Date(tenantCreated).toLocaleDateString()}</p>
      </div>
    );
  }

  return <div>Regular business page</div>;
}
```

### 2. API Integration Approach

You can also fetch tenant data via API:

```javascript
// Fetch tenant data from your tenant app
async function getTenantData(subdomain) {
  try {
    const response = await fetch(`https://your-tenant-app.vercel.app/api/tenant/${subdomain}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tenant data:', error);
    return null;
  }
}

// Use in your component
export default function BusinessPage() {
  const [tenant, setTenant] = useState(null);
  const searchParams = useSearchParams();
  const tenantSubdomain = searchParams.get('tenant');

  useEffect(() => {
    if (tenantSubdomain) {
      getTenantData(tenantSubdomain).then(setTenant);
    }
  }, [tenantSubdomain]);

  if (tenant) {
    return (
      <div>
        <h1>Welcome to {tenant.subdomain}'s Business</h1>
        <div className="text-4xl">{tenant.emoji}</div>
        <p>Customer since: {new Date(tenant.createdAt).toLocaleDateString()}</p>
      </div>
    );
  }

  return <div>Loading...</div>;
}
```

### 3. Custom Hook for Tenant Data

Create a reusable hook:

```javascript
// hooks/useTenant.js
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export function useTenant() {
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const tenantSubdomain = searchParams.get('tenant');

  useEffect(() => {
    if (tenantSubdomain) {
      setLoading(true);
      fetch(`https://your-tenant-app.vercel.app/api/tenant/${tenantSubdomain}`)
        .then(res => res.json())
        .then(data => {
          setTenant(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching tenant:', error);
          setLoading(false);
        });
    }
  }, [tenantSubdomain]);

  return { tenant, loading };
}

// Use in your components
export default function BusinessPage() {
  const { tenant, loading } = useTenant();

  if (loading) return <div>Loading...</div>;
  
  if (tenant) {
    return (
      <div>
        <h1>Welcome to {tenant.subdomain}'s Business</h1>
        <div className="text-4xl">{tenant.emoji}</div>
      </div>
    );
  }

  return <div>Regular business page</div>;
}
```

### 4. Styling Based on Tenant

You can customize the appearance based on tenant data:

```javascript
export default function BusinessPage({ tenant }) {
  const tenantStyles = tenant ? {
    '--tenant-color': tenant.emoji === '🎨' ? '#ff6b6b' : '#4ecdc4',
    '--tenant-bg': tenant.emoji === '🎨' ? '#fff5f5' : '#f0f9ff'
  } : {};

  return (
    <div style={tenantStyles} className="tenant-themed">
      {tenant && (
        <div className="tenant-header">
          <div className="tenant-emoji">{tenant.emoji}</div>
          <h1>{tenant.subdomain}'s Business</h1>
        </div>
      )}
      {/* Rest of your business content */}
    </div>
  );
}
```

### 5. Analytics and Tracking

Track tenant-specific visits:

```javascript
// Track tenant visits
useEffect(() => {
  if (tenant) {
    // Google Analytics
    gtag('event', 'tenant_visit', {
      tenant_subdomain: tenant.subdomain,
      tenant_emoji: tenant.emoji
    });
    
    // Custom analytics
    fetch('/api/analytics/tenant-visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tenant: tenant.subdomain,
        timestamp: Date.now()
      })
    });
  }
}, [tenant]);
```

## Benefits

- ✅ **Personalized Experience**: Each customer sees their branded subdomain
- ✅ **Seamless Integration**: Works with existing business app
- ✅ **Flexible Data**: Access to tenant emoji, creation date, etc.
- ✅ **Analytics Ready**: Track customer-specific visits
- ✅ **Scalable**: Easy to add more tenant-specific features
