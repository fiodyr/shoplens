// app/page.tsx
"use client";
import { useTranslations } from 'next-intl';
import MainSlider from '@/components/MainSlider/MainSlider';
import { useEffect, useState } from 'react';
import styles from './Page.module.css';
import { API_CONFIG } from '@/config/api.config';

interface Slide {
  id: string;
  name: string;
  imageUrl: string;
  linkUrl: string;
  linkText: string;
}

interface HomePageData {
  total: number;
  list: [{
    id: string;
    name: string;
    slides: Slide[];
    promotionalBanners: Array<{
      id: string;
      name: string;
      imageUrl: string;
      linkUrl: string;
    }>;
    products: Array<{
      id: string;
      name: string;
      sku: string;
      price: number | null;
      rrp: number;
      isActive: boolean;
      mainImagePathsData: {
        thumbnails: {
          medium: string;
        };
      };
      priceUnitData: {
        symbol: string;
      };
    }>;
  }];
}

export default function Home() {
  const t = useTranslations();
  const [pageData, setPageData] = useState<HomePageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await fetch(
          `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PAGE}?` + 
          `select=${API_CONFIG.QUERY_PARAMS.PAGE.HOME_SELECT}&` +
          `where=${JSON.stringify(API_CONFIG.QUERY_PARAMS.PAGE.HOME_WHERE)}&` +
          `maxSize=${API_CONFIG.PAGINATION.DEFAULT_MAX_SIZE}`, {
          headers: {
            'Authorization': `Basic ${API_CONFIG.AUTH.BASIC_TOKEN}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: HomePageData = await response.json();
        setPageData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!pageData || !pageData.list[0]) {
    return <div>No data available</div>;
  }

  const { slides, promotionalBanners, products } = pageData.list[0];

  return (
    <div>
      <div className={styles.sliderSection}>
        {slides && <MainSlider slides={slides} />}
      </div>

      <div>
        <h1>{t('welcome')}</h1>
      </div>

      {/* Promotional Banners Section */}
      {promotionalBanners && promotionalBanners.length > 0 && (
        <div className={styles.promotionalBanners}>
          {promotionalBanners.map(banner => (
            <a key={banner.id} href={banner.linkUrl}>
              <img src={banner.imageUrl} alt={banner.name} />
            </a>
          ))}
        </div>
      )}
	  
      <div>
        <p>{t('description')}</p>
      </div>
	  
      {/* Popular Products Section */}
		{products && products.length > 0 && (
        <div className={styles.popularProducts}>
          {products.map(product => (
            <div key={product.id} className={styles.productCard}>
              <a href={`/product/${product.sku}`} >
				<img 
				  src={`${API_CONFIG.BASE_URL}/${product.mainImagePathsData.thumbnails.medium}`} 
				  alt={product.name} 
				  className={styles.img}
				/>
                <h3>{product.name}</h3>
                <div className={styles.priceInfo}>
                    {product.isActive && (
                      <>
                        {product.price !== null && (
                          <span className={styles.currentPrice}>
                            {product.priceUnitData.symbol}{product.price}
                          </span>
                        )}
                        {product.rrp > 0 && (
                          <span className={styles.oldPrice}>
                            {product.priceUnitData.symbol}{product.rrp}
                          </span>
                        )}
                      </>
                    )}
                </div>
              </a>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

