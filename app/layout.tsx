import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://nova-ashen-three.vercel.app/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "NOVA International Airport",
    template: "%s | NOVA Airport",
  },

  description:
    "Explore flights, navigate terminals, plan your journey and discover destinations with NOVA International Airport.",

  applicationName: "NOVA International Airport",

  keywords: [
    "NOVA International Airport",
    "airport",
    "flight information",
    "airport navigation",
    "flight departures",
    "flight arrivals",
    "terminal map",
    "travel",
    "Lagos airport",
    "airport services",
  ],

  authors: [
    {
      name: "Temitope",
      url: "https://temitope112.vercel.app/",
    },
  ],

  creator: "Temitope",
  publisher: "NOVA International Airport",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteUrl,
    siteName: "NOVA International Airport",
    title: "NOVA International Airport",
    description:
      "A modern digital airport experience designed to make every journey feel effortless.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NOVA International Airport",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "NOVA International Airport",
    description:
      "Explore flights, navigate terminals and experience a new way to move through the airport.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "travel",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111820",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}