"use client";

import { useEffect } from "react";

/** Registers the static `/sw.js` so Chrome can offer Install. */
export function RegisterServiceWorker() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    const run = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* preview hosts may block SW; install UI still documents A2HS */
      });
    };
    if (document.readyState === "complete") run();
    else window.addEventListener("load", run, { once: true });
  }, []);

  return null;
}
