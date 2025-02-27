import { useState, useEffect, useCallback } from 'react';
import { notFound } from 'next/navigation';
import { contentApi } from '@/services/api';

interface Content {
  name: string;
  text: string;
}

export const useContent = (slug: string) => {
  const [content, setContent] = useState<Content | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleNotFound = useCallback(() => {
    notFound();
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await contentApi.getBySlug(slug);

        if (response.data.list.length > 0) {
          setContent(response.data.list[0]);
        } else {
          handleNotFound();
        }
      } catch (error) {
        console.error('Error fetching content:', error);
        handleNotFound();
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [slug, handleNotFound]);

  return { content, isLoading };
};