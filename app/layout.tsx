import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Praveen Kumar - Portfolio",
  description: "Full-Stack Developer specializing in MERN stack development",
  keywords: [
    "developer",
    "portfolio",
    "web development",
    "frontend",
    "backend",
    "full-stack",
    "MERN stack",
    "Praveen Kumar",
  ],
  authors: [{ name: "Praveen Kumar" }],
  creator: "Praveen Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "",
    title: "Praveen Kumar - Portfolio",
    description: "Full-Stack Developer specializing in MERN stack development",
    images: [
      {
        url: "https://praveenkumar-portfolio.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Praveen Kumar - Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Praveen Kumar - Portfolio",
    description: "Full-Stack Developer specializing in MERN stack development",
    images: ["https://praveenkumar-portfolio.com/og-image.jpg"],
    creator: "@praveenkumar",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
