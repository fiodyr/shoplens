import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import '../globals.css';
//import LanguageSwitcher from '../../components/LanguageSwitcher';
import { locales } from '../../i18n/settings';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './Layout.module.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params: { locale } }) {
  if (!locales.includes(locale as any)) notFound();

  let messages;
  let content;
  let main;
  content = styles.gridContainer;
  main = styles.mainContent;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
		  <div className={content}>
          <main className={main}>
            {children}
          </main>
		  </div>
		  <Footer />
        </NextIntlClientProvider>
      </body> 
    </html>
  );
}