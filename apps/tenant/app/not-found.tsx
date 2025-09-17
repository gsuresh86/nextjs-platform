import Link from 'next/link';
import { protocol, rootDomain } from '@platforms/shared';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
          Subdomain Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          The subdomain you're looking for doesn't exist.
        </p>
        <Link
          href={`${protocol}://${rootDomain}`}
          className="text-blue-500 hover:underline"
        >
          Go back to {rootDomain}
        </Link>
      </div>
    </div>
  );
}
