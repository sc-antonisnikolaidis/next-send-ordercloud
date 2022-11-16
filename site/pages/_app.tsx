// import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config()

import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'

import { FC, ReactNode, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import Script from 'next/script'
import { Auth0Provider } from '@auth0/auth0-react'

const Noop: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <Head />

      {/* LOAD SITECORE SEND TRACKER from public folder (load once for all pages) */}
      <Script src="/scripts/mootrack.js" />

      <Auth0Provider
        domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ''}
        clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ''}
        redirectUri={process.env.NEXT_PUBLIC_BASE_URL}
      >
        <ManagedUIContext>
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
        </ManagedUIContext>
      </Auth0Provider>
    </>
  )
}
