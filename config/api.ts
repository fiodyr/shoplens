export const API_CONFIG = {
  baseURL: 'http://192.168.0.236/api/v1',
  headers: {
    'Authorization': 'Basic dXNlcjphNzhjNjE5ZjEzZWE3YjJhYTFlMjUzZTJkMjYxMzJjYQ=='
  },
  endpoints: {
    content: '/Content',
    category: '/Category'
  }
} as const;