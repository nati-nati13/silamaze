import { Geist_Mono, Playfair_Display, Poppins } from 'next/font/google';
import { type ReactNode } from 'react';

import { APP_DESCRIPTION, APP_NAME } from '@/shared/const/app.const';
import { ThemeProvider } from '@/shared/providers/theme-provider';

import type { Metadata } from 'next';

import './globals.css';

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="ka"
      className={`${playfairDisplay.variable} ${poppins.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
