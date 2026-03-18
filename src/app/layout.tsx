import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "LearnSemi - Semiconductor Learning for Data Scientists",
  description:
    "A comprehensive, structured learning path for data scientists and ML engineers entering the semiconductor industry.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <main className="lg:ml-72 min-h-screen">
          <div className="px-6 py-8 lg:px-12 lg:py-12">{children}</div>
        </main>
      </body>
    </html>
  );
}
