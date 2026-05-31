import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'My Porto Web',
  description: 'Portfolio website built with Next.js and prepared for Supabase integration.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
