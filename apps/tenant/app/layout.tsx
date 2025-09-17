import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Platforms Tenant',
  description: 'Tenant application for subdomain resolution',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
