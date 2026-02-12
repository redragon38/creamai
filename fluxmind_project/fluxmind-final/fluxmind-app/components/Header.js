import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-opacity-80 border-b border-purple-900/20">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg gradient-purple flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
            <span className="text-2xl font-bold">FluxMind</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#tools" className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-purple-900/20">
              Outils
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-purple-900/20">
              Ressources
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-purple-900/20">
              À propos
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            <Link href="#tools" className="block text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-purple-900/20">
              Outils
            </Link>
            <Link href="#" className="block text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-purple-900/20">
              Ressources
            </Link>
            <Link href="#" className="block text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-purple-900/20">
              À propos
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
