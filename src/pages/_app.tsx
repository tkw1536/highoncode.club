import * as React from 'react';
import '../styles/latex.css'
import '../styles/global.css'
import Script from "next/script";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <script async src="https://inform.everyone.wtf/legal.min.js?float" />
    </Head>
    <Component {...pageProps} />
  </>
}
