import React from 'react';
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Manrope, DM_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '../components/themes'
import { Toaster } from 'sonner'
import ReactQueryProvider from '../react-query';
import './globals.css'

const manrope = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'frameflow',
  description: 'Share AI powered videos with your friends.',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${manrope.className} bg-[#171717]`}>
        <ClerkProvider>
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              disableTransitionOnChange
            >
              <Toaster />
              {children}
            </ThemeProvider>
          </ReactQueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
};

export default RootLayout;