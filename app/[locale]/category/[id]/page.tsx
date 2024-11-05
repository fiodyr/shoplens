// app/category/[id]/page.tsx
import styles from './CategoryPage.module.css';
import Link from 'next/link';
import axios from 'axios';

async function getCategories(id: string) {
  try {
    const response = await axios.get(`http://192.168.0.236/api/v1/Category`, {
      params: {
        select: 'name, code, children, products',
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
        maxSize: id === 'all' ? 100 : 1
      },
      headers: {
        'Authorization': 'Basic dXNlcjphNzhjNjE5ZjEzZWE3YjJhYTFlMjUzZTJkMjYxMzJjYQ=='
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
                        <img src={`http://192.168.0.236/${product.mainImagePathsData?.thumbnails?.medium}`} width={150} alt={product.name} />
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