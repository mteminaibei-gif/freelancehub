import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FreelanceHub - Hire Expert Freelancers',
  description: 'Connect with top talent for your projects',
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
