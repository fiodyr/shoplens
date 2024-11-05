import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/settings';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed'
});

export const config = {
  matcher: [
    '/',
    '/(en|ru)/:path*',
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};