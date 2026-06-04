"use client";

import React from "react";
import { useStore } from "../../context/StoreContext";
import { Navbar } from "../../components/Navbar";
import { AdminLogin } from "../../components/AdminLogin";
import { AdminDashboard } from "../../components/AdminDashboard";

export default function AdminPage() {
  const { isAdmin } = useStore();

  return (
    <div className="flex flex-col min-h-screen bg-obsidian">
      {/* Dynamic Header */}
      <Navbar />

      {/* Main Admin Section */}
      <main className="flex-1 flex items-center justify-center py-10">
        {isAdmin ? (
          <div className="w-full">
            <AdminDashboard />
          </div>
        ) : (
          <AdminLogin />
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-neutral-900 bg-obsidian">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-[10px] font-mono text-neutral-600">
          SECURE SNEAKER SHOWCASE PLATFORM &copy; 2026. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}
