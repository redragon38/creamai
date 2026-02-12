import Link from 'next/link';
import { useState } from 'react';
import { Zap, Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-[#0a0118]/80 border-b border-purple-900/20" data-testid="header">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2" data-testid="logo">
            <div className="w-10 h-10 rounded-lg gradient-purple flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">FluxMind</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <Link href="#" className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-purple-900/20">
              Accueil
            </Link>
            <Link href="#tools" className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-purple-900/20">
              Outils
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-purple-900/20">
              Ressources
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-purple-900/20">
              Aide
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-purple-900/20">
              Contact
            </Link>
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 border-t border-purple-900/20 pt-4">
            <Link href="#" className="block text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-purple-900/20">
              Accueil
            </Link>
            <Link href="#tools" className="block text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-purple-900/20">
              Outils
            </Link>
            <Link href="#" className="block text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-purple-900/20">
              Ressources
            </Link>
            <Link href="#" className="block text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-purple-900/20">
              Aide
            </Link>
            <Link href="#" className="block text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-purple-900/20">
              Contact
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
