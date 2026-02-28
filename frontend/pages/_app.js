import '../styles/globals.css'
<<<<<<< HEAD
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Viewport correct ici car Head dans _app se met dans <head> */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <Component {...pageProps} />
    </>
  )
=======

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
>>>>>>> c228359ea51c899aa80248fc4488d9fe7c10d9f7
}
