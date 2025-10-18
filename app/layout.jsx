import { Layout } from 'nextra-theme-docs'
import { Navbar } from 'nextra-theme-docs'
import { Footer } from 'nextra-theme-docs'
import { Banner } from 'nextra/components'
import { Head } from 'nextra/components'
import { Search } from 'nextra/components'
import Image from 'next/image'
import Link from 'next/link'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.png" type="image/x-icon" />
      </Head>
      <body>
        <Layout
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
          project={{
            link: 'https://github.com/ConnorMcElwain',
          }}
          docsRepositoryBase="https://github.com/ConnorMcElwain/mcelwain.me"
          editLink={{
            component: null
          }}
          feedback={{
            content: null
          }}
          footer={{
            text: (
              <span>
                MIT {new Date().getFullYear()} ©{' '}
                <a href="https://mcelwain.me/" target="_blank">
                  McElwain.me
                </a>{' '}
                |{' '}
                <a href="https://github.com/ConnorMcElwain/mcelwain.me/commits/main/" target="_blank">
                  Change Logs
                </a>
                {' '}
                |{' '}
                <a href="https://stats.mcelwain.me" target="_blank">
                  Status
                </a>
                {' '}
                |{' '}
                <a href="/known-issues">
                  Known Issues
                </a>
              </span>
            )
          }}
        >
          <Navbar />
          <Banner
            key="beta-release"
            text={
              <a>
                🔥 Check out my documented journey on how to set up <a href="/posts/microsoft/configuration-manager/mecm-setup"><b><u>Configuration Manager (MECM)</u></b></a> and my updated notes on the <a href="/posts/microsoft/azure/az-104/cert-notes"><b><u>Azure AZ-104 Exam</u></b></a>! 🔥
              </a>
            }
          />
          <Search />
          {children}
          <Footer />
        </Layout>
      </body>
    </html>
  )
}
