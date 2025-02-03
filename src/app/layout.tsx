import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AchievementProvider } from '@/contexts/AchievementContext';
import { GitHubLevelProvider } from '@/contexts/GitHubLevelContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sun | Full Stack Software Engineer",
  description: "Full Stack Software Engineer specializing in JavaScript, TypeScript, Python/Flask, React, and cloud architecture. Building accessible, scalable applications for museum tech, civic tech, and AI-driven systems.",
  keywords: [
    "Full Stack Engineer",
    "Software Engineer",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Python",
    "Flask",
    "Cloud Architecture",
    "AWS",
    "Accessibility",
    "Richmond",
    "Virginia"
  ],
  openGraph: {
    title: "Sun | Full Stack Software Engineer",
    description: "Building accessible, scalable applications with modern web technologies.",
    type: "website",
    locale: "en_US",
    url: "https://sunthecoder.com",
    siteName: "Sun's Portfolio",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Sun's Portfolio Site"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sun | Full Stack Software Engineer",
    description: "Building accessible, scalable applications with modern web technologies.",
    images: ["/og-image.jpg"]
  },
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: "https://sunthecoder.com"
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
        <ThemeProvider>
          <AchievementProvider>
            <GitHubLevelProvider>
              {children}
            </GitHubLevelProvider>
          </AchievementProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
