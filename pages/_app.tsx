import 'inter-ui/inter.css'

import { CssBaseline, GeistProvider } from '@geist-ui/react'

import { AppProps } from 'next/app'
import { ReactElement } from 'react';

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <GeistProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  );
}

export default MyApp