import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import type { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: (
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
  ),

  project: {
    link: 'https://github.com/ConnorMcElwain',
  },

  docsRepositoryBase: 'https://github.com/ConnorMcElwain/mcelwain.me',

  useNextSeoProps() {
    const { asPath } = useRouter()
    if (asPath === '/') {
      return {
        title: 'mcelwain.me',
        titleTemplate: null,
      }
    }
    return {
      titleTemplate: '%s | mcelwain.me',
    }
  },

  head: (
    <>
      <link rel="icon" href="/favicon.png" type="image/x-icon" />
    </>
  ),

  banner: {
    key: 'beta-release',
    text: (
      <a>
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
      </a>
    ),
  },

  editLink: { component: null },
  feedback: { content: null },

  footer: {
    text: (
      <span>
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
        |{' '}
        <a href="/known-issues">
          Known Issues
        </a>
      </span>
    ),
  },
}

export default config
