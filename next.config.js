/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "http://localhost:5000",
  },
  i18n: {
    locales: ["en-US", "en"],
    defaultLocale: "en-US",
  },
};

module.exports = nextConfig;
