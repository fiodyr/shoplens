"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';
import useScrollDirection from '../../hooks/useScrollDirection';
import { useCategories } from '../../hooks/useCategories';
import Filter from '@/components/Filter/Filter'; 
import MegaMenu from '@/components/MegaMenu/MegaMenu'; 
import styles from './Header.module.css';
import { generateLocalizedLink } from '@/utils/locale';  

export default function Header() {
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const t = useTranslations();
  const params = useParams();
  const currentLocale = params.locale as string;
  //const { categories, isLoading, error } = useCategories();
  const error = false;
  const isLoading = false;
  const categories = [
  {"id": "cat_001", "name": "Electronics", "code": "ELEC", "childrenCount": 3, "parentId": null, "parentName": null},
  {"id": "cat_002", "name": "Smartphones", "code": "SMART", "childrenCount": 0, "parentId": "cat_001", "parentName": "Electronics"},
  {"id": "cat_003", "name": "Laptops", "code": "LAP", "childrenCount": 0, "parentId": "cat_001", "parentName": "Electronics"},
  {"id": "cat_004", "name": "Accessories", "code": "ACC", "childrenCount": 1, "parentId": "cat_001", "parentName": "Electronics"},
  {"id": "cat_005", "name": "Chargers", "code": "CHG", "childrenCount": 0, "parentId": "cat_004", "parentName": "Accessories"}
];

  useEffect(() => {
    if (isShopMenuOpen) {
      requestAnimationFrame(() => {
        setMenuVisible(true);
      });
    }
  }, [isShopMenuOpen]);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const closeShopMenu = () => {
    setMenuVisible(false);
    setTimeout(() => {
      setIsShopMenuOpen(false);
    }, 300);
  };
  
  const isVisible = useScrollDirection(closeShopMenu, isFilterOpen);

  // Перенесли проверку загрузки и ошибок в return
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <header className={`${styles.header} ${!isVisible ? styles.hidden : ""}`}>
        <nav className={styles.nav}>
			<div className={`${styles.leftMenu} ${isMobileMenuOpen ? styles.active : ''}`}>
			  <div className={styles.menuItem}>
				{isMobileMenuOpen ? (
				  <Link 
					href={generateLocalizedLink('/category/all', currentLocale)} 
					className={styles.menuItem}
					onClick={() => {
					  closeShopMenu();
					  setIsMobileMenuOpen(false);
					}}
				  >
					{t('all_categories')}
				  </Link>
				) : (
				  <span 
					onClick={() => !isShopMenuOpen ? setIsShopMenuOpen(true) : closeShopMenu()}
					className={styles.shopLink}
				  >
					{t('shop')} 
					<span className={styles.menuIcon}>
					  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 33 32">
						<path stroke="currentColor" strokeWidth="2" d="M24.447 11.996 16.443 20l-8-8.004"></path>
					  </svg>           
					</span>
				  </span>
				)}
			  </div>
			  <Link href={generateLocalizedLink('/info_kak-sdelat-pokupku', currentLocale)} className={styles.menuItem} onClick={closeShopMenu}>{t('kak-sdelat-pokupku')}</Link>
			</div>

          <div className={styles.logo}>
            <Link href={generateLocalizedLink('', currentLocale)} onClick={closeShopMenu}>
				<img 
					src="/images/sl_logo.png" 
					alt="eCommerce frontend"
					loading="lazy"
					/>	
			</Link>
          </div>

          <div className={styles.rightMenu}>
            <LanguageSwitcher />
            <Link href={generateLocalizedLink('/account', currentLocale)} className={styles.icon} onClick={closeShopMenu}>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 32 32"><path fill="currentColor" fillRule="evenodd" d="M12.818 8.318a4.5 4.5 0 1 1 6.364 6.364 4.5 4.5 0 0 1-6.364-6.364Zm-1.414-1.414a6.5 6.5 0 1 1 9.192 9.192 6.5 6.5 0 0 1-9.192-9.192ZM11.069 22H21a4 4 0 0 1 4 4H7.07a4 4 0 0 1 4-4Zm-6 4a6 6 0 0 1 6-6H21a6 6 0 0 1 6 6v2H5.07v-2Z" clipRule="evenodd"></path></svg>
			</Link>
			<Link href={generateLocalizedLink('/favorites', currentLocale)} className={styles.icon} onClick={closeShopMenu}>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 32 32"><path stroke="currentColor" strokeWidth="2" d="m15.191 10.089.746.879.765-.863 1.806-2.037c1.326-1.447 2.665-1.972 3.812-1.985 1.163-.013 2.263.498 3.108 1.37 1.686 1.74 2.246 4.806.042 7.43l-9.773 10.615-9.16-10.6c-2.189-2.637-1.667-5.77-.012-7.53.825-.877 1.905-1.387 3.06-1.367 1.143.02 2.503.561 3.884 2.06l1.723 2.028Z"></path></svg>			
			</Link>
            <Link href={generateLocalizedLink('/cart', currentLocale)} className={styles.icon} onClick={closeShopMenu}>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 25 24"><path fill="currentColor" fillRule="evenodd" d="M3.125 4.5h2.308l.693 12.79.039.71H19.525l.093-.644 1.5-10.52.122-.856H7.014l-.123-2.27L6.854 3H3.125v1.5Zm4.176 6.75-.204-3.77h4.278v3.77H7.301Zm.081 1.5.203 3.75h5.29v-3.75H7.382Zm6.993 0v3.75h3.85l.534-3.75h-4.384Zm4.598-1.5.538-3.77h-6.636v3.77h6.098ZM8.375 19.875a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0ZM18.5 21a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" clipRule="evenodd"></path></svg>
			</Link>
			  <span onClick={() => setIsFilterOpen(true)}>
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path fill="#000" fillRule="evenodd" d="M3.05 3.283A.5.5 0 0 1 3.5 3h13.109a.5.5 0 0 1 .39.812l-4.72 5.9v3.965a.5.5 0 0 1-.176.38l-3.45 2.933a.5.5 0 0 1-.823-.381V9.712l-4.72-5.9a.5.5 0 0 1-.06-.529ZM4.54 4l4.18 5.225a.5.5 0 0 1 .11.312v5.99l2.45-2.082V9.537a.5.5 0 0 1 .109-.312L15.569 4H4.54Z" clipRule="evenodd"></path></svg>
			  </span>			
			  <span 
				className={styles.mobileMenuBtn} 
				onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
			  >
				<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.75 6.5L20.25 6.5" stroke="currentColor" strokeWidth="1.5"></path><path d="M3.75 12.5L20.25 12.5" stroke="currentColor" strokeWidth="1.5"></path><path d="M3.75 18.5L20.25 18.5" stroke="currentColor" strokeWidth="1.5" ></path></svg>
			  </span>
          </div>
        </nav>
		<Filter isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
      </header>
	  
      {isShopMenuOpen && typeof document !== 'undefined' && createPortal(
        <>
          <div 
            className={`${styles.overlay} ${menuVisible ? styles.visible : ''}`} 
            onClick={closeShopMenu}
          />
          <div className={`${styles.megaMenu} ${menuVisible ? styles.visible : ''}`}>
            <div className={styles.megaMenuContent}>
              <div className={styles.categories}>
					<MegaMenu 
					  categories={categories}
					  currentLocale={currentLocale}
					  onClose={closeShopMenu}
					/>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}	 	  
	  
    </>
  );
}