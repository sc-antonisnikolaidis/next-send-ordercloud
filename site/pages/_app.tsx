import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'

import { FC, ReactNode, useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import Script from 'next/script'
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'
import { useRouter } from 'next/router'
import Page from '@components/common/Page'

const Noop: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <Head />

      {/* LOAD SITECORE SEND TRACKER from public folder (load once for all pages) */}
      <Script src="/scripts/mootrack.js" strategy="beforeInteractive" />

      <Auth0Provider
        domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ''}
        clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ''}
        redirectUri={process.env.NEXT_PUBLIC_BASE_URL + router.asPath}
      >
        <ManagedUIContext>
          <Page>
            <Layout pageProps={pageProps}>
              <Component {...pageProps} />
            </Layout>
          </Page>
        </ManagedUIContext>
      </Auth0Provider>
    </>
  )
}
