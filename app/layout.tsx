import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './globals.css'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: {
    default: 'mcelwain.me',
    template: '%s | mcelwain.me'
  },
  description:
    'Personal website of Connor McElwain – notes, documentation, and IT projects.'
}

const banner = (
    <Banner storageKey="beta-release">
      🔥 Check out my documented journey on how to set up{' '}
      <Link href="/posts/microsoft/configuration-manager/mecm-setup">
        <b>
          <u>Configuration Manager (MECM)</u>
        </b>
      </Link>{' '}
      and my updated notes on the{' '}
      <Link href="/posts/microsoft/azure/az-104/cert-notes">
        <b>
          <u>Azure AZ-104 Exam</u>
        </b>
      </Link>
      ! 🔥
    </Banner>
  )

const navbar = (
  <Navbar
    logo={
      <div className="flex items-center space-x-2">
        <Image
          src="/logo.png"
          alt="Website Logo"
          width={75}
          height={50}
        />
      </div>
    }
  />
)

const footer = (
  <Footer className="flex flex-wrap items-center justify-start gap-2 md:justify-start">
    <span>
      MIT {new Date().getFullYear()} ©{' '}
      <a
        href="https://mcelwain.me"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        McElwain.me
      </a>
      {' '}|{' '}
      <a
        href="https://github.com/ConnorMcElwain/mcelwain.me/commits/main/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        Change Logs
      </a>
      {' '}|{' '}
      <a
        href="https://stats.mcelwain.me"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        Status
      </a>
      {' '}|{' '}
      <a
        href="/known-issues"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        Known Issues
      </a>
    </span>
  </Footer>
)


export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
    >
      <Head>

      </Head>
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          footer={footer}
          editLink={null}
          pageMap={await getPageMap()}
          feedback={{ content: null }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
