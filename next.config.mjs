// next.config.mjs
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.0.236',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '192.168.0.236',
        port: '3000',
        pathname: '/**',
      }
    ],
  },
};

export default withNextIntl(config);