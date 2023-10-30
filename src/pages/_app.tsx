import React from "react";
import { AppProps } from "next/app";
import { Instrument_Sans, Inter, Ubuntu } from "next/font/google";
import 'src/styles/globals.css';

const instrument_sans = Instrument_Sans({subsets: ['latin']})


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={instrument_sans.className}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
