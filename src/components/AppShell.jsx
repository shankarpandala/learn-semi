"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import ThemeProvider from "./ThemeProvider";
import { ServiceWorkerRegistration } from "./ServiceWorkerRegistration";

export default function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar
          onToggleSidebar={() => setSidebarOpen((o) => !o)}
          sidebarOpen={sidebarOpen}
        />
        <div className="flex flex-1">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-1 min-w-0 lg:ml-[280px]">
            <div className="px-6 py-8 lg:px-12 lg:py-12">{children}</div>
          </main>
        </div>
        <Footer />
      </div>
      <ServiceWorkerRegistration />
    </ThemeProvider>
  );
}
