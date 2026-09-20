"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, clearToken } from "@/lib/auth";

const MENU = [
  ["/dashboard", "Ringkasan"],
  ["/dashboard/kendaraan", "Kendaraan"],
  ["/dashboard/testimoni", "Testimoni"],
  ["/dashboard/sosial", "Sosial Media"],
  ["/dashboard/landing", "Edit Landing"],
  ["/dashboard/pengaturan", "Pengaturan"],
];

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [siap, setSiap] = useState(false);

  useEffect(() => {
    if (!getToken()) router.replace("/login");
    else setSiap(true);
  }, [router]);

  if (!siap) return null;

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 border-r bg-gray-50 p-4">
        <h2 className="mb-4 font-bold">RentalLombok</h2>
        <nav className="flex flex-col gap-1 text-sm">
          {MENU.map(([href, label]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </nav>
        <button onClick={() => { clearToken(); router.replace("/login"); }} className="mt-6 text-sm text-red-600">
          Keluar
        </button>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}