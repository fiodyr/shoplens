'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from './ProductPage.module.css';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [productData, setProductData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://192.168.0.236/api/v1/Product`, {
          params: {
            select: 'name,sku,price,longDescription,mainImagePathsData',
            where: JSON.stringify([`{
              "type": "or",
              "value": [
                {
                  "type": "equals",
                  "attribute": "sku",
                  "value": "${params.id}"
                }
              ]
            }`]),
            maxSize: params.id === 'all' ? 20 : 1
          },
          headers: {
            'Authorization': 'Basic dXNlcjphNzhjNjE5ZjEzZWE3YjJhYTFlMjUzZTJkMjYxMzJjYQ==',
          },
        });

        if (response.data.list.length > 0) {
          // Трансформация данных для совместимости с предыдущим кодом
          const transformedData = 
             {
                id: response.data.list[0].id,
                name: response.data.list[0].name,
                description: response.data.list[0].longDescription.replace(/<[^>]*>/g, ''),
                price: response.data.list[0].price || 0,
                image: response.data.list[0].mainImagePathsData?.thumbnails?.large || '',
                url: `/product/${response.data.list[0].sku}`
              };

          setProductData(transformedData);
        } else {
          setError('No product found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Рендеринг для списка продуктов
  if (Array.isArray(productData)) {
    return (
      <div className={styles.productGrid}>
        {productData.map((product) => (
          <Link href={product.url} key={product.id}>
            <div className={styles.productCard}>
              <div className={styles.imageContainer}>
                <img src={`http://192.168.0.236/${product.image}`} width={150} alt={product.name} />
              </div>
              <div className={styles.productInfo}>
                <h2>{product.name}</h2>
                <div className={styles.paragraph}>
                  {product.description.length > 50 
                    ? product.description.substring(0, 50) + "..." 
                    : product.description}
                </div>
                <p>{product.price} €</p>
              </div>
              <button className={styles.button}>Add to Cart</button>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  // Рендеринг для одного продукта
  return (
    <div>
      <div className={styles.heading}>
        <h1>{productData.name}</h1>
      </div>
      <div className={styles.paragraph}>
        <p>{productData.description}</p>
      </div>
      <p>{productData.price} €</p>
      <div>
        <img src={`http://192.168.0.236/${productData.image}`} width={350} alt={productData.name} />
      </div>
      <button className={styles.button}>Add to Cart</button>
    </div>
  );
}