import nextra from 'nextra'
import path from 'path'

// Pass an object into nextra() — even if empty — so Nextra initializes properly
const withNextra = nextra({})

export default withNextra({
  experimental: {
    mdxRs: true,
  },
  webpack: (config) => {
    // Add alias to fix “next-mdx-import-source-file” resolution
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'next-mdx-import-source-file': path.resolve('./mdx-components.js'),
    }
    return config
  },
})
