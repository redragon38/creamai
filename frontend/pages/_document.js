import { Html, Head, Main, NextScript } from 'next/document'
<<<<<<< HEAD
=======
import Script from 'next/script'
>>>>>>> c228359ea51c899aa80248fc4488d9fe7c10d9f7

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
<<<<<<< HEAD
        {/* ── Viewport mobile (dans _document, pas dans _app) ── */}
        
        {/* ── Preconnect fonts ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* display=swap + font-display pour éviter FOIT */}
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />

        {/* ── Favicons ── */}
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* ── Meta mobile ── */}
        <meta name="theme-color" content="#7c3aed" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />

        {/* ── Google Analytics (chargé en defer pour ne pas bloquer) ── */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-8G6N9DX0FL" />
=======
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-8G6N9DX0FL"></script>
>>>>>>> c228359ea51c899aa80248fc4488d9fe7c10d9f7
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
<<<<<<< HEAD
              gtag('config', 'G-8G6N9DX0FL', { send_page_view: false });
            `,
          }}
        />
      </Head>
      <body style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
=======
              gtag('config', 'G-8G6N9DX0FL');
            `,
          }}
        />
        {/* Favicons - ordre important pour forcer le navigateur */}
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <body style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
>>>>>>> c228359ea51c899aa80248fc4488d9fe7c10d9f7
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
