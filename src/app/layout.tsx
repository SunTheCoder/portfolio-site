import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sun | Full Stack Developer",
  description: "Full Stack Developer specializing in JavaScript, TypeScript, Python/Flask, React, and more. View my portfolio and projects.",
  keywords: ["Full Stack Developer", "JavaScript", "TypeScript", "React", "Next.js"],
  openGraph: {
    title: "Sun | Full Stack Developer",
    description: "Full Stack Developer specializing in JavaScript, TypeScript, Python/Flask, React, and more.",
    images: ['/og-image.jpg'], // Add an OG image
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
