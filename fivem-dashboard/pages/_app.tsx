import '../styles/globals.css';

import getConfig from 'next/config';
import Head from 'next/head';
import { useCallback, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import type { AppProps } from 'next/app'
const { publicRuntimeConfig } = getConfig()

export const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>Fivem-Dashbaord</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content="Verwalte deine Schulaufgaben ganz einfach" />
      <meta name="theme-color" content="#0f2027"></meta>
    </Head>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  </>
}

export default MyApp
