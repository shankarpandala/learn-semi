import type { Metadata, Viewport } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";

export const viewport: Viewport = {
  themeColor: "#3b82f6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "LearnSemi - Semiconductor Learning for Data Scientists",
  description:
    "A comprehensive, structured learning path for data scientists and ML engineers entering the semiconductor industry.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LearnSemi",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons/icon-192.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/icon-512.svg" />
      </head>
      <body>
        <Sidebar />
        <main className="lg:ml-72 min-h-screen">
          <div className="px-6 py-8 lg:px-12 lg:py-12">{children}</div>
        </main>
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
