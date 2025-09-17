import { redis } from '@/lib/redis';
import type { SubdomainData } from '@platforms/types';

export async function getSubdomainData(subdomain: string) {
  const sanitizedSubdomain = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
  const data = await redis.get<SubdomainData>(
    `subdomain:${sanitizedSubdomain}`
  );
  return data;
}

export async function getAllSubdomains() {
  const keys = await redis.keys('subdomain:*');

  if (!keys.length) {
    return [];
  }

  const values = await redis.mget<SubdomainData[]>(...keys);

  return keys.map((key, index) => {
    const subdomain = key.replace('subdomain:', '');
    const data = values[index];

    return {
      subdomain,
      emoji: data?.emoji || '❓',
      createdAt: data?.createdAt || Date.now()
    };
  });
}
