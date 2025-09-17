import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSubdomainData } from '@/lib/subdomains';
import { protocol, rootDomain } from '@platforms/shared';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: rootDomain,
    description: `Tenant application for ${rootDomain}`
  };
}

export default async function TenantPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="absolute top-4 right-4">
        <Link
          href={`${protocol}://${rootDomain}`}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          {rootDomain}
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Welcome to {rootDomain}
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            This is the tenant application
          </p>
        </div>
      </div>
    </div>
  );
}
