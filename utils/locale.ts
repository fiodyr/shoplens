export function generateLocalizedLink(pathname: string, locale: string) {
  // Проверяем, начинается ли путь с локали
  const hasLocale = /^\/[a-z]{2}(\/|$)/.test(pathname);
  
  if (hasLocale) {
    // Заменяем текущую локаль на новую
    return pathname.replace(/^\/[a-z]{2}/, `/${locale}`);
  } else {
    // Добавляем локаль в начало URL
    return `/${locale}${pathname}`;
  }
}