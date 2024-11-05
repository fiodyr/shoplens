import { useState, useEffect } from 'react';
import { categoryApi } from '@/services/api';

interface Category {
  name: string;
  code: string;
  id: string | number; 
  parentId?: string | number; 
}

interface CategoryResponse {
  list: Category[];
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log('Fetching categories...'); // Проверка начала запроса
        const response = await categoryApi.getAll();
        console.log('Categories response:', response.data); // Проверка ответа
        setCategories(response.data.list);
      } catch (err) {
        console.error('Categories error:', err); // Детальный лог ошибки
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  console.log('Hook state:', { categories, isLoading, error }); // Проверка состояния хука
  return { categories, isLoading, error };
};