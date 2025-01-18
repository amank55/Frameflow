import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Manrope} from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "../components/themes";
const manrope = Manrope({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: "Frameflow",
  description: "Share AI powered videos with your friends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${manrope.className} bg-[#171717]`}>
      <ThemeProvider
       attribute="class"
       defaultTheme="system"
       enableSystem
       disableTransitionOnChange
      ></ThemeProvider>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
