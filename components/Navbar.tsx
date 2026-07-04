'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { user, profile, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            FH
          </div>
          <span className="text-2xl font-semibold tracking-tight">FreelanceHub</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {user && profile ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium hover:text-blue-600 transition">
                Dashboard
              </Link>
              <Link href="/freelancers" className="text-sm font-medium hover:text-blue-600 transition">
                Freelancers
              </Link>
              {profile.role !== 'freelancer' && (
                <Link href="/projects/new" className="text-sm font-medium hover:text-blue-600 transition">
                  Post Project
                </Link>
              )}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">{profile.full_name}</span>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium hover:bg-gray-100 px-4 py-2 rounded-xl transition">
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-sm font-semibold rounded-2xl transition"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-6 py-4 space-y-4">
            {user && profile ? (
              <>
                <Link href="/dashboard" className="block text-sm font-medium hover:text-blue-600">
                  Dashboard
                </Link>
                <Link href="/freelancers" className="block text-sm font-medium hover:text-blue-600">
                  Freelancers
                </Link>
                {profile.role !== 'freelancer' && (
                  <Link href="/projects/new" className="block text-sm font-medium hover:text-blue-600">
                    Post Project
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="w-full text-left px-4 py-2 text-sm font-medium bg-red-100 text-red-700 rounded-xl hover:bg-red-200"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block text-sm font-medium">
                  Sign In
                </Link>
                <Link href="/signup" className="block text-sm font-medium">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
