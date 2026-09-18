"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
    setReady(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("aakaar-theme", next);
    } catch {
      /* storage blocked — the change still applies for this session */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="grid h-9 w-9 place-items-center rounded-sm border border-line text-paper-dim transition-colors hover:border-blue hover:text-blue"
    >
      {/* Drafting-paper / blueprint toggle rather than a sun-moon cliché */}
      <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden focusable="false">
        <rect
          x="2.5"
          y="3.5"
          width="15"
          height="13"
          rx="1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M10 3.5v13"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity={ready ? 1 : 0}
        />
        <rect
          x={theme === "dark" ? 2.5 : 10}
          y="3.5"
          width="7.5"
          height="13"
          fill="currentColor"
          opacity="0.9"
          style={{ transition: "x 0.3s ease" }}
        />
      </svg>
    </button>
  );
}
