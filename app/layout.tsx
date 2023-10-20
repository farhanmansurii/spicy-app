import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
export const metadata: Metadata = {
  title: "Spicy Anime - Your Ad-Free Anime Hub",
  description:
    "Watch unlimited anime series and movies, track your progress, and enjoy an ad-free experience. Your ultimate anime destination.",
  appleWebApp: {
    capable: true,
    title: "My Website",
    statusBarStyle: "black-translucent",
  },
  keywords: [
    "anime",
    "watch anime",
    "anime app",
    "ad-free",
    "anime tracking",
    "Japanese animation",
  ],
  applicationName:'Spicy Anime',
  category:'streaming',
  icons: "/icon.png",
  colorScheme:'dark'
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#e63946" />
          <title>spicyanime</title>
        </head>
        <body className="bg-background">
          <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
