'use client';
import React from 'react';
import { useContent } from '@/hooks/useContent';

interface PageProps {
  params: {
    locale: string;
    slug: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const { slug } = params;
  const { content, isLoading } = useContent(slug);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!content) {
    return null;
  }

  return (
    <div>
      <h1>{content.name}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.text }} />
    </div>
  );
};

export default Page;