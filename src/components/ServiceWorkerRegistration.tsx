"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/learn-semi/sw.js", { scope: "/learn-semi/" })
        .catch(() => {
          // Service worker registration failed — not critical
        });
    }
  }, []);

  return null;
}
