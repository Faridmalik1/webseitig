"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center text-white">
      <h1 className="text-6xl font-extrabold text-[#C8E646] mb-4">404</h1>
      <p className="text-xl text-white/60 mb-8">Diese Seite existiert nicht.</p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-[#C8E646] text-[#171717] font-bold hover:bg-[#d4f050] transition-colors"
      >
        Zurück zur Startseite
      </Link>
    </div>
  );
}
