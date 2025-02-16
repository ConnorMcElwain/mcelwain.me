import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'

const config: DocsThemeConfig = {
  head: (
    <>
      <link rel="icon" href="/components/assets/favicon/logo.svg" />
    </>
  ),
  banner: {
    key: 'beta-release',
    text: (
      <a>
        🔥 Check out my documented journey on how to set up <a href="/posts/microsoft/configuration-manager/mecm-setup"><b><u>Configuration Manager (MECM)</u></b></a> and my updated notes on the <a href="/posts/microsoft/azure/az-104/cert-notes"><b><u>Azure AZ-104 Exam</u></b></a>! 🔥
      </a>
    )
  },
  logo: <span>beta.mcelwain.me</span>,
  project: {
    link: 'https://github.com/ConnorMcElwain',
  },
  useNextSeoProps() {
    const { asPath } = useRouter();
  
    if (asPath === '/') {
      return {
        title: 'mcelwain.me – beta',
        titleTemplate: null
      };
    }
  
    return {
      titleTemplate: '%s | mcelwain.me – beta'
    };
  },   
  docsRepositoryBase: 'https://github.com/ConnorMcElwain/beta.mcelwain.me',
  editLink: {
    component: null
  },
  feedback: {
    content: null
  },
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{' '}
        <a href="https://beta.mcelwain.me/" target="_blank">
          McElwain.me
        </a>{' '}
        |{' '}
        <a href="https://github.com/ConnorMcElwain/beta.mcelwain.me/commits/main/" target="_blank">
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
  },
}

export default config