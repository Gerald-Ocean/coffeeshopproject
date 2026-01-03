// src/components/Navbar.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { Coffee, User, Menu, X } from "lucide-react";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  // Fungsi untuk menutup menu saat link diklik (UX mobile)
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-coffee-800 text-coffee-100 p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-widest flex items-center gap-2 z-50 relative">
          <Coffee /> SARONE
        </Link>
        
        {/* Desktop Menu (Hidden on Mobile) */}
        <div className="hidden md:flex space-x-6 text-sm uppercase tracking-wide font-medium">
          <NavLink href="/" onClick={closeMenu}>Home</NavLink>
          <NavLink href="/menu" onClick={closeMenu}>Menu</NavLink>
          <NavLink href="/about" onClick={closeMenu}>Our Story</NavLink>
          <NavLink href="/team" onClick={closeMenu}>Team</NavLink>
          <NavLink href="/blog" onClick={closeMenu}>Blog</NavLink>
          {isAuthenticated && (
            <NavLink href="/blog/create" onClick={closeMenu}>Create Blog</NavLink>
          )}
        </div>

        {/* Desktop Auth Button */}
        <div className="hidden md:flex items-center gap-4">
          <AuthButtons isAuthenticated={isAuthenticated} logout={logout} />
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <button 
          className="md:hidden z-50 relative focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown / Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 flex flex-col items-center justify-center md:hidden transition-all duration-300">
          <div className="p-8 rounded-lg bg-black">
            <div className="flex flex-col space-y-8">
              <NavLink href="/" onClick={closeMenu} mobile>Home</NavLink>
              <NavLink href="/menu" onClick={closeMenu} mobile>Menu</NavLink>
              <NavLink href="/about" onClick={closeMenu} mobile>Our Story</NavLink>
              <NavLink href="/team" onClick={closeMenu} mobile>Team</NavLink>
              <NavLink href="/blog" onClick={closeMenu} mobile>Blog</NavLink>
              {isAuthenticated && (
                <NavLink href="/blog/create" onClick={closeMenu} mobile>Create Blog</NavLink>
              )}
              
              <div className="mt-8">
                <AuthButtons isAuthenticated={isAuthenticated} logout={logout} onClick={closeMenu} />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// Komponen Helper untuk Link agar kode lebih bersih
function NavLink({ href, children, onClick, mobile = false }: { href: string, children: React.ReactNode, onClick?: () => void, mobile?: boolean }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`${mobile ? 'text-2xl py-2 text-white px-8 rounded-lg hover:bg-gray-700' : 'hover:text-coffee-400'} transition font-medium uppercase tracking-wide`}
    >
      {children}
    </Link>
  );
}

// Komponen Helper untuk Tombol Login/Logout
function AuthButtons({ isAuthenticated, logout, onClick }: { isAuthenticated: boolean, logout: () => void, onClick?: () => void }) {
  if (isAuthenticated) {
    return (
      <button 
        onClick={() => { logout(); onClick?.(); }} 
        className="bg-red-600 hover:bg-red-700 text-black px-6 py-2 rounded-full text-sm font-bold transition"
      >
        LOGOUT
      </button>
    );
  }
  return (
    <Link 
      href="/login" 
      onClick={onClick}
      className="bg-coffee-100 text-coffee-900 hover:bg-white px-6 py-2 rounded-full text-sm font-bold transition flex items-center gap-2"
    >
      <User size={16}/> LOGIN
    </Link>
  );
}