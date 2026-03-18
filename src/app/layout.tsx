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
  manifest: "/learn-semi/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "LearnSemi",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#3b82f6",
    "msapplication-TileImage": "/learn-semi/icons/icon-144x144.png",
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
        <link rel="icon" href="/learn-semi/favicon.svg" type="image/svg+xml" />
        <link
          rel="apple-touch-icon"
          href="/learn-semi/icons/apple-touch-icon.png"
        />
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
