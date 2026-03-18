import "./globals.css";
import AppShell from "../components/AppShell";

export const viewport = {
  themeColor: "#3b82f6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  title: "LearnSemi - Semiconductor Learning for Data Scientists",
  description:
    "A comprehensive, structured learning path for data scientists and ML engineers entering the semiconductor industry.",
  manifest: "/learn-semi/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "LearnSemi",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#3b82f6",
    "msapplication-TileImage": "/learn-semi/icons/icon-144x144.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Lora:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/learn-semi/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/learn-semi/icons/apple-touch-icon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('learnsemi-theme');if(t==='light')document.documentElement.classList.remove('dark');else document.documentElement.classList.add('dark')}catch(e){document.documentElement.classList.add('dark')}})()`,
          }}
        />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
