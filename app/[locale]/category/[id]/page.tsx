// app/category/[id]/page.tsx
import styles from './CategoryPage.module.css';
import Link from 'next/link';
import axios from 'axios';
import { API_CONFIG } from '@/config/api.config';

interface Product {
  id: string;
  sku: string;
  name: string;
  price: number;
  mainImagePathsData?: {
    thumbnails?: {
      medium?: string;
    };
  };
}

interface Category {
  id: string;
  code: string;
  name: string;
  children: Category[];
  products: Product[];
}

async function getCategories(id: string): Promise<Category[]> {
  try {
    const response = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CATEGORY}`, {
      params: {
        select: API_CONFIG.QUERY_PARAMS.CATEGORY.DEFAULT_SELECT,
        where: JSON.stringify([`{
          "type": "or",
          "value": [
            {
              "type": "equals",
              "attribute": "code",
              "value": "${id}"
            }
          ]
        }`]),
        maxSize: id === 'all' ? API_CONFIG.PAGINATION.ALL_CATEGORIES_SIZE : API_CONFIG.PAGINATION.DEFAULT_MAX_SIZE
      },
      headers: {
        'Authorization': `Basic ${API_CONFIG.AUTH.BASIC_TOKEN}`
      }
    });

    return response.data.list;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const categories = await getCategories(params.id);

  return (
    <div>
      <div className={styles.categoryGrid}>
        {categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.id}>
              <Link href={`/category/${category.code}`}>
                <div className={styles.categoryCard}>
                  <div className={styles.heading}>
                    <h1>{category.name}</h1>
                  </div>
                </div>
              </Link>
			{category.children.map((child) => (
				<Link href={`/category/${child.code}`} key={child.id}>
					<div className={styles.categoryCard}>
					  <div className={styles.heading}>
						<h1>{child.name}</h1>
					  </div>
					</div>
				</Link>
			))}
              <div className={styles.productGrid}>
                {category.products.map((product) => (
                  <Link href={`/product/${product.sku}`} key={product.id}>
                    <div className={styles.productCard}>
                      <div className={styles.imageContainer}>
                        <img 
                          src={`${API_CONFIG.BASE_URL}/${product.mainImagePathsData?.thumbnails?.medium}`} 
                          width={150} 
                          alt={product.name} 
                        />
                      </div>
                      <div className={styles.productInfo}>
                        <h2>{product.name}</h2>
                        <p>{product.price} €</p>
                      </div>
                      <button className={styles.button}>Add to Cart</button>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className={styles.heading}>
            <h1>Category not found</h1>
          </div>
        )}
      </div>
    </div>
  );
}