import * as React from 'react';
import '../styles/latex.css'
import '../styles/global.css'
import Script from "next/script";

export default function MyApp({ Component, pageProps }) {
  return <>
    <Script async strategy="beforeInteractive" src="https://inform.everyone.wtf/legal.min.js?float" />
    <Component {...pageProps} />
  </>
}
