import { withNextra } from 'nextra'

const withDocs = withNextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  contentDirBasePath: '/',
})

export default withDocs()
