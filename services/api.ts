import axios from 'axios';
import { API_CONFIG } from '@/config/api';

export const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  headers: API_CONFIG.headers
});

export const contentApi = {
  getBySlug: (slug: string) => {
    const params = {
      select: 'name,text',
      where: JSON.stringify([{
        type: 'and',
        value: [{
          type: 'equals',
          attribute: 'slug',
          value: slug
        }]
      }]),
      maxSize: 1
    };

    return apiClient.get(API_CONFIG.endpoints.content, { params });
  }
};

export const categoryApi = {
  getAll: () => {
    const params = {
      select: 'name,code,id,parentId', 
      maxSize: 150
    };

    return apiClient.get(API_CONFIG.endpoints.category, { params });
  }
};