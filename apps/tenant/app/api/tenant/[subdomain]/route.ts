import { NextRequest, NextResponse } from 'next/server';
import { getSubdomainData } from '@/lib/subdomains';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ subdomain: string }> }
) {
  try {
    const { subdomain } = await params;
    const tenantData = await getSubdomainData(subdomain);

    if (!tenantData) {
      return NextResponse.json(
        { error: 'Subdomain not found' },
        { status: 404 }
      );
    }

    // Return tenant data for business app to consume
    return NextResponse.json({
      subdomain,
      emoji: tenantData.emoji,
      createdAt: tenantData.createdAt,
      redirectUrl: `https://business.tvarly.com?tenant=${subdomain}&tenant_emoji=${encodeURIComponent(tenantData.emoji)}&tenant_created=${tenantData.createdAt}`
    });
  } catch (error) {
    console.error('Error fetching tenant data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
