"use client";

import * as React from "react";
import Link from "next/link";
import { Database, PencilRuler, Phone, Plus } from "lucide-react";
import { HomeNav } from "@/components/home-nav"; // adjust path as needed

export default function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  return (
    <nav className="fixed bottom-4 right-4 z-50">
      {/* Static Plus Button */}
      <button
        onClick={toggleMenu}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] transition-transform duration-500 hover:rotate-45"
      >
        <Plus size={16} strokeWidth={1.0} />
      </button>

      {/* Floating Home Button, wrapping HomeNav in a circular container */}
      <div
        onClick={closeMenu}
        className={`absolute top-0 right-0 flex h-12 w-12 items-center justify-center rounded-full
          bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] transition-all duration-300 ${
            open
              ? "translate-y-[-80px] opacity-100 scale-100"
              : "translate-y-0 opacity-0 scale-0"
          }`}
      >
        <div className="flex h-full w-full items-center justify-center">
          <HomeNav />
        </div>
      </div>

      {/* Floating Icon Buttons */}
      <Link href="/dashboard">
        <button
          onClick={closeMenu}
          className={`absolute top-0 right-0 flex h-12 w-12 items-center justify-center rounded-full
            bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] transition-transform duration-300 ${
              open
                ? "translate-y-[-160px] opacity-100 scale-100"
                : "translate-y-0 opacity-0 scale-0"
            }`}
        >
          <Database size={16} strokeWidth={1.0} />
        </button>
      </Link>

      <Link href="/tasks">
        <button
          onClick={closeMenu}
          className={`absolute top-0 right-0 flex h-12 w-12 items-center justify-center rounded-full
            bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] transition-transform duration-300 ${
              open
                ? "translate-y-[-240px] opacity-100 scale-100"
                : "translate-y-0 opacity-0 scale-0"
            }`}
        >
          <PencilRuler size={16} strokeWidth={1.0} />
        </button>
      </Link>

      <Link href="/phonebook">
        <button
          onClick={closeMenu}
          className={`absolute top-0 right-0 flex h-12 w-12 items-center justify-center rounded-full
            bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] transition-transform duration-300 ${
              open
                ? "translate-y-[-320px] opacity-100 scale-100"
                : "translate-y-0 opacity-0 scale-0"
            }`}
        >
          <Phone size={16} strokeWidth={1.0} />
        </button>
      </Link>

      {/* SVG Filter for Gooey Effect */}
      <svg
        className="absolute hidden"
        width="0"
        height="0"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="gooey">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0   0 1 0 0 0   0 0 1 0 0   0 0 0 20 -10"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>
    </nav>
  );
}
