import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSubdomainData } from '@/lib/subdomains';
import { protocol, rootDomain } from '@platforms/shared';

export async function generateMetadata({
  params
}: {
  params: Promise<{ subdomain: string }>;
}): Promise<Metadata> {
  const { subdomain } = await params;
  const subdomainData = await getSubdomainData(subdomain);

  if (!subdomainData) {
    return {
      title: rootDomain
    };
  }

  return {
    title: `${subdomain}.${rootDomain}`,
    description: `Subdomain page for ${subdomain}.${rootDomain}`
  };
}

export default async function SubdomainPage({
  params
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const subdomainData = await getSubdomainData(subdomain);

  if (!subdomainData) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="absolute top-4 right-4">
        <Link
          href={`${protocol}://${rootDomain}`}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Powered by {rootDomain}
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-9xl mb-6">{subdomainData.emoji}</div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Welcome to {subdomain}.{rootDomain}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            This is your custom subdomain page
          </p>
          
          {/* Add more content for custom domains */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Your Business</h2>
            <p className="text-gray-600 mb-4">
              This is your personalized business page. You can customize this content
              to showcase your business, services, or products.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Learn More
              </button>
              <button className="border border-blue-500 text-blue-500 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            Created on {new Date(subdomainData.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}
