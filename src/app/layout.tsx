import ReduxProvider from '@/store/ReduxProvider'
import type { Metadata } from "next";
import "./globals.css";
import {Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/providers/authProvider";
import AuthHydrator from '@/providers/AuthHydrator';
import { Toaster } from 'react-hot-toast';
import NextAuthProvider from '@/providers/nextauthProvider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "NEPTRAVI",
  description: "A website for travel enthusiasts",
  openGraph: {
    title: "NEPTRAVI",
    description: "A website for travel enthusiasts",
    url: "https://neptravi.vercel.app",
    siteName: "NEPTRAVI",
    images: [
      {
        url: "https://neptravi.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NEPTRAVI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEPTRAVI",
    description: "A website for travel enthusiasts",
    images: ["https://neptravi.vercel.app/og-image.jpg"],
  },
  

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased font-sans`}
        suppressHydrationWarning={true}
      >
        <NextAuthProvider>
          <ReduxProvider>
            <AuthProvider>
                  <AuthHydrator />
                  <Navbar />
                  <Toaster position='bottom-right' />
                  {children}
            </AuthProvider>
          </ReduxProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
