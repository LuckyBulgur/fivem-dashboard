/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    serverUrl: (process.env.NODE_ENV == "development") ? 'http://localhost:3001' : 'https://server.domain.de',
  },
  reactStrictMode: true,
  i18n: {
    locales: ['de-DE'],
    defaultLocale: 'de-DE'
  },
}

module.exports = nextConfig
