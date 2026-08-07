"use client";

import { useEffect, useState } from "react";

import { MoonIcon, SunIcon } from "@/components/ui/icon";

type Theme = "dark" | "light";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  // Starts "dark" to match the server-rendered markup (root layout's inline
  // script sets the real value on <html> before paint, but React doesn't see
  // that) -- synced from the DOM in the effect below so the icon never lies
  // for longer than one paint.
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const root = document.documentElement;

    const syncFromDom = () => {
      setTheme(root.getAttribute("data-theme") === "light" ? "light" : "dark");
    };

    syncFromDom();

    // Real subscription, not just an excuse to satisfy the lint rule: keeps
    // this button in sync if `data-theme` changes from outside React (e.g.
    // the root layout's inline no-flash script, or a second toggle instance).
    const observer = new MutationObserver(syncFromDom);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private browsing / storage disabled -- the toggle still works for
      // this page load, it just won't persist across visits.
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className={`text-on-surface-variant hover:text-primary-fixed active:scale-95 transition-colors ${className}`.trim()}
    >
      {theme === "light" ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
    </button>
  );
}
