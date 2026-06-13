"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navigation.module.css";

const navItems = [
  {
    id: "home",
    href: "/",
    label: "Trang chủ",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path
          d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9 21 9 15 12 15C15 15 15 21 15 21M9 21H15"
          stroke={active ? "#fe2c55" : "currentColor"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={active ? "rgba(254,44,85,0.15)" : "none"}
        />
      </svg>
    ),
  },
  {
    id: "explore",
    href: "/explore",
    label: "Khám phá",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" width="24" height="24">
        <circle
          cx="11"
          cy="11"
          r="8"
          stroke={active ? "#fe2c55" : "currentColor"}
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M21 21l-4.35-4.35"
          stroke={active ? "#fe2c55" : "currentColor"}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "upload",
    href: "/upload",
    label: "Đăng video",
    icon: (_active: boolean) => (
      <svg viewBox="0 0 24 24" width="24" height="24">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="#fe2c55" />
        <path
          d="M12 8v8M8 12h8"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "inbox",
    href: "/inbox",
    label: "Hộp thư",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path
          d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
          stroke={active ? "#fe2c55" : "currentColor"}
          strokeWidth="2"
          fill={active ? "rgba(254,44,85,0.15)" : "none"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "profile",
    href: "/profile",
    label: "Hồ sơ",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" width="24" height="24">
        <circle
          cx="12"
          cy="8"
          r="4"
          stroke={active ? "#fe2c55" : "currentColor"}
          strokeWidth="2"
          fill={active ? "rgba(254,44,85,0.15)" : "none"}
        />
        <path
          d="M6 20v-1a6 6 0 0112 0v1"
          stroke={active ? "#fe2c55" : "currentColor"}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* ── Sidebar (Desktop) ── */}
      <nav className={styles.sidebar} role="navigation" aria-label="Sidebar navigation">
        <div className={styles.logo}>
          <span className={styles.logoIcon}>▶</span>
          <span className={styles.logoText}>VibeReel</span>
        </div>

        <ul className={styles.sidebarList}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`${styles.sidebarItem} ${isActive ? styles.sidebarItemActive : ""}`}
                  id={`nav-sidebar-${item.id}`}
                >
                  <span className={styles.sidebarIcon}>
                    {item.icon(isActive)}
                  </span>
                  <span className={styles.sidebarLabel}>{item.label}</span>
                  {isActive && <div className={styles.activeBar} />}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className={styles.sidebarFooter}>
          <div className={styles.footerUser}>
            <div className={styles.footerAvatar}>U</div>
            <div>
              <p className={styles.footerName}>User Demo</p>
              <p className={styles.footerSub}>@vibereels</p>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Bottom Nav (Mobile) ── */}
      <nav className={styles.bottomNav} role="navigation" aria-label="Bottom navigation">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              id={`nav-bottom-${item.id}`}
              className={`${styles.bottomItem} ${isActive ? styles.bottomItemActive : ""}`}
            >
              <span className={styles.bottomIcon}>{item.icon(isActive)}</span>
              <span className={styles.bottomLabel}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
