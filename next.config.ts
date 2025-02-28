import type { NextConfig } from 'next'
// import reactComponentName from 'react-scan/react-component-name/webpack'
 
const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
}
 
export default nextConfig

// import type { NextConfig } from 'next'
// import ReactComponentName from 'react-scan/react-component-name/webpack'

// const nextConfig: NextConfig = {
//   experimental: {
//     reactCompiler: true,
//     turbo: undefined, // Remove Turbopack config
//   },
//   webpack: (config, { dev }) => {
//     if (!dev) config.plugins?.push(ReactComponentName({}))
//     return config
//   }
// }

// export default nextConfig
