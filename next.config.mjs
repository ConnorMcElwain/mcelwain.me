import { nextra } from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true,
  flexsearch: {
    codeblocks: false
  },
  contentDirBasePath: '/'
})

export default withNextra({
  reactStrictMode: true
})
