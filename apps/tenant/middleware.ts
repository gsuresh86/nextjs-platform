import { type NextRequest, NextResponse } from 'next/server';
import { rootDomain } from '@platforms/shared';
import { getSubdomainData } from '@/lib/subdomains';

function extractSubdomain(request: NextRequest): string | null {
  const url = request.url;
  const host = request.headers.get('host') || '';
  const hostname = host.split(':')[0];

  // Local development environment
  if (url.includes('localhost') || url.includes('127.0.0.1')) {
    // Try to extract subdomain from the full URL
    const fullUrlMatch = url.match(/http:\/\/([^.]+)\.localhost/);
    if (fullUrlMatch && fullUrlMatch[1]) {
      return fullUrlMatch[1];
    }

    // Fallback to host header approach
    if (hostname.includes('.localhost')) {
      return hostname.split('.')[0];
    }

    return null;
  }

  // Production environment - tvarly.vercel.app
  const rootDomainFormatted = rootDomain.split(':')[0];

  // Handle preview deployment URLs (tenant---branch-name.vercel.app)
  if (hostname.includes('---') && hostname.endsWith('.vercel.app')) {
    const parts = hostname.split('---');
    return parts.length > 0 ? parts[0] : null;
  }

  // Handle Vercel subdomains (harly.tvarly.vercel.app)
  if (hostname.endsWith('.vercel.app')) {
    const parts = hostname.split('.');
    if (parts.length >= 3) {
      // Check if it's a subdomain of our app
      const potentialSubdomain = parts[0];
      const domain = parts.slice(-2).join('.');
      
      // Exclude reserved subdomains
      const reservedSubdomains = ['tvarly', 'www'];
      
      if (domain === 'vercel.app' && !reservedSubdomains.includes(potentialSubdomain)) {
        return potentialSubdomain;
      }
    }
  }

  // Regular subdomain detection for tvarly.vercel.app
  const isSubdomain =
    hostname !== rootDomainFormatted &&
    hostname !== `www.${rootDomainFormatted}` &&
    hostname.endsWith(`.${rootDomainFormatted}`);

  return isSubdomain ? hostname.replace(`.${rootDomainFormatted}`, '') : null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const subdomain = extractSubdomain(request);

  if (subdomain) {
    // Check if this is a customer subdomain (not business/platform)
    if (subdomain !== 'business' && subdomain !== 'platform' && subdomain !== 'www') {
      try {
        // Look up tenant data in Redis
        const tenantData = await getSubdomainData(subdomain);
        
        if (tenantData) {
          // Customer subdomain exists - serve tenant page directly
          if (pathname === '/') {
            return NextResponse.rewrite(new URL(`/s/${subdomain}`, request.url));
          }
        } else {
          // Subdomain doesn't exist - show 404
          return NextResponse.rewrite(new URL('/not-found', request.url));
        }
      } catch (error) {
        console.error('Error looking up subdomain:', error);
        // Fallback to 404 on error
        return NextResponse.rewrite(new URL('/not-found', request.url));
      }
    }
    
    // For business/platform subdomains, handle normally
    if (pathname === '/') {
      return NextResponse.rewrite(new URL(`/s/${subdomain}`, request.url));
    }
  }

  // On the root domain, allow normal access
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|[\\w-]+\\.\\w+).*)'
  ]
};