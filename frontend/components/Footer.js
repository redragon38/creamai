import Link from 'next/link';
import { Zap, Twitter, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-purple-900/30 py-12 mt-20" data-testid="footer">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-lg gradient-purple flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">FluxMind</span>
            </div>
            <p className="text-gray-400 text-sm">
              Libérez la puissance de l'innovation IA pour votre entreprise. Découvrez les meilleurs outils pour booster votre productivité.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Produit</h4>
            <ul className="space-y-3">
              <li><Link href="#tools" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Outils</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Ressources</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Blog</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">API</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Entreprise</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">À propos</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Blog</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Carrières</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Légal</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Confidentialité</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Conditions d'utilisation</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Politique de cookies</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Sécurité</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-900/30 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; 2026 FluxMind. Tous droits réservés.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Statut</Link>
            <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Documentation</Link>
            <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
