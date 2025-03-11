"use client";
import {
  Zap,
  CreditCard,
  PencilRuler,
  Phone,
  Plus,
  Home,
  CircleDollarSign,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { Button } from "./ui/button";
import { MobileHomeNav } from "./mobile-home-nav";

export default function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  return (
    <nav className="fixed bottom-4 right-4 z-50">
      {/* Static Plus Button */}
      <Button
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] transition-transform duration-500 hover:rotate-45"
        onClick={toggleMenu}
      >
        <Plus className="h-4 w-4 stroke-1" />
      </Button>

      {/* Floating Icon Buttons */}
      <div>
        <Button
          className={`absolute top-0 right-0 flex h-12 w-12 items-center justify-center rounded-full
            bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] transition-transform duration-300 ${
              open
                ? "translate-y-[-80px] opacity-100 scale-100"
                : "translate-y-0 opacity-0 scale-0"
            }`}
          onClick={closeMenu}
        >
          <MobileHomeNav />
        </Button>
      </div>

      <Link href="/dashboard">
        <Button
          className={`absolute top-0 right-0 flex h-12 w-12 items-center justify-center rounded-full
            bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] transition-transform duration-300 ${
              open
                ? "translate-y-[-160px] opacity-100 scale-100"
                : "translate-y-0 opacity-0 scale-0"
            }`}
          onClick={closeMenu}
        >
          <CircleDollarSign className="h-4 w-4 stroke-1" />
        </Button>
      </Link>

      <Link href="/insights">
        <Button
          className={`absolute top-0 right-0 flex h-12 w-12 items-center justify-center rounded-full
            bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] transition-transform duration-300 ${
              open
                ? "translate-y-[-240px] opacity-100 scale-100"
                : "translate-y-0 opacity-0 scale-0"
            }`}
          onClick={closeMenu}
        >
          <CreditCard className="h-4 w-4 stroke-1" />
        </Button>
      </Link>

      {/*
      <Link href="/tasks">
        <Button
          className={`absolute top-0 right-0 flex h-12 w-12 items-center justify-center rounded-full
            bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] transition-transform duration-300 ${
              open
                ? "translate-y-[-320px] opacity-100 scale-100"
                : "translate-y-0 opacity-0 scale-0"
            }`}
          onClick={closeMenu}
        >
          <PencilRuler className="h-4 w-4 stroke-1" />
        </Button>
      </Link>
      */}

      <Link href="/phonebook">
        <Button
          className={`absolute top-0 right-0 flex h-12 w-12 items-center justify-center rounded-full
            bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] transition-transform duration-300 ${
              open
                ? "translate-y-[-320px] opacity-100 scale-100"
                : "translate-y-0 opacity-0 scale-0"
            }`}
          onClick={closeMenu}
        >
          <Phone className="h-4 w-4 stroke-1" />
        </Button>
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
