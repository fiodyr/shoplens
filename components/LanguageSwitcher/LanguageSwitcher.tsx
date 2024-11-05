"use client";
import { usePathname, useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import styles from './LanguageSwitcher.module.css';
import { generateLocalizedLink } from '@/utils/locale'; 

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as string;

  const switchLanguage = (locale: string) => {
    router.push(generateLocalizedLink(pathname, locale));
  };

  const languages = [
    { locale: 'ru', flag: '🇷🇺' },
    { locale: 'en', flag: '🇬🇧' },
  ];

  return (
    <>
      {languages.map(({ locale, flag }) => (
        locale !== currentLocale && (
          <span key={locale} onClick={() => switchLanguage(locale)} className={styles.langIcon}>
            {flag}
          </span>
        )
      ))}
    </>
  );
}
