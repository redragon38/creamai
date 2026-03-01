<<<<<<< HEAD
import '../styles/globals.css';
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', toggle);
    return () => window.removeEventListener('scroll', toggle);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 gradient-purple rounded-xl shadow-lg shadow-purple-400/40 flex items-center justify-center hover:-translate-y-1 hover:shadow-purple-500/50 transition-all animate-fade-in"
      aria-label="Retour en haut"
    >
      <ArrowUp className="w-5 h-5 text-white" />
    </button>
  );
}
=======
import '../styles/globals.css'
import Head from 'next/head'
>>>>>>> e1e71006e992e9f1033014f1fa53003639ef3267

export default function App({ Component, pageProps }) {
  return (
    <>
<<<<<<< HEAD
      <Component {...pageProps} />
      <ScrollToTop />
    </>
  );
=======
      <Head>
        {/* Viewport correct ici car Head dans _app se met dans <head> */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <Component {...pageProps} />
    </>
  )
>>>>>>> e1e71006e992e9f1033014f1fa53003639ef3267
}
