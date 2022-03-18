const dotenv = require('dotenv');
dotenv.config();

const nextConfig = {
  publicRuntimeConfig: {
    serverUrl: (process.env.NODE_ENV == "development") ? 'http://localhost:3001' : process.env.SERVER_URL,
  },
  reactStrictMode: true,
  i18n: {
    locales: ['de-DE'],
    defaultLocale: 'de-DE'
  },
}

module.exports = nextConfig
