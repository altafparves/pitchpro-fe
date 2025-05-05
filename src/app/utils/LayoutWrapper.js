// src/app/components/LayoutWrapper.jsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "../components/navbar";
export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isChapterPage = pathname.startsWith("/story/") && pathname.includes("/chapter/");
  const showNavbar = !isChapterPage;


  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-neutral-50">{children}</main>
      {showNavbar && <Navbar />}
    </div>
  );
}
