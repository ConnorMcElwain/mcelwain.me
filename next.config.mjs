import nextra from 'nextra'
import path from 'path'

const withNextra = nextra({})

export default withNextra({
  experimental: {
    mdxRs: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'next-mdx-import-source-file': path.resolve('./mdx-components.tsx'),
    }
    return config
  },
})
