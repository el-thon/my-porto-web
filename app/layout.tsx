import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Elthon Jhon Kevin — Informatics Student Portfolio',
  description: 'Portfolio of Elthon Jhon Kevin, Informatics Engineering student at Universitas Lampung.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
