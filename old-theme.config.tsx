import './globals.css'
import 'nextra-theme-docs/style.css'
import type { ReactNode } from 'react'
import { Layout, Navbar, Footer } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

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
    <a href="/posts/microsoft/configuration-manager/mecm-setup">
      <b>
        <u>Configuration Manager (MECM)</u>
      </b>
    </a>{' '}
    and my updated notes on the{' '}
    <a href="/posts/microsoft/azure/az-104/cert-notes">
      <b>
        <u>Azure AZ-104 Exam</u>
      </b>
    </a>
    ! 🔥
  </Banner>
)

const navbar = (
  <Navbar
    logo={
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/logo.png"
          alt="Site Logo"
          width={75}
          height={50}
          priority
          className="h-auto w-auto object-contain"
        />
      </Link>
    }
    projectLink="https://github.com/ConnorMcElwain"
  />
)

const footer = (
  <Footer className="flex-col items-center md:items-start">
    MIT {new Date().getFullYear()} ©{' '}
    <a href="https://mcelwain.me/" target="_blank" rel="noopener noreferrer">
      McElwain.me
    </a>{' '}
    |{' '}
    <a
      href="https://github.com/ConnorMcElwain/mcelwain.me/commits/main/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Change Logs
    </a>{' '}
    |{' '}
    <a href="https://stats.mcelwain.me" target="_blank" rel="noopener noreferrer">
      Status
    </a>{' '}
    | <a href="/known-issues">Known Issues</a>
  </Footer>
)

export default async function RootLayout({
  children
}: {
  children: ReactNode
}) {
  const pageMap = await getPageMap()

  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
    >
      <Head
        backgroundColor={{
          dark: 'rgb(15, 23, 42)',
          light: 'rgb(254, 252, 232)'
        }}
        color={{
          hue: { dark: 120, light: 0 },
          saturation: { dark: 100, light: 100 }
        }}
      />
      <body className="__nextra-body">
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/ConnorMcElwain/mcelwain.me"
          editLink={false}
          feedback={false}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
