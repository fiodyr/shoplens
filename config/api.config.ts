export const API_CONFIG = {
  BASE_URL: process.env.API_BASE_URL || 'http://192.168.1.236',
  ENDPOINTS: {
    CATEGORY: '/api/v1/Product',
    PRODUCT: '/api/v1/Product',
    PAGE: '/api/v1/Page',
  },
  AUTH: {
    BASIC_TOKEN: process.env.API_BASIC_TOKEN || 'YWRtaW46YWRtaW4xMjM=',
  },
  PAGINATION: {
    DEFAULT_MAX_SIZE: 1,
    ALL_CATEGORIES_SIZE: 100,
    ALL_PRODUCTS_SIZE: 20,
  },
  QUERY_PARAMS: {
    CATEGORY: {
      DEFAULT_SELECT: 'name, code, children, products',
    },
    PRODUCT: {
      DEFAULT_SELECT: 'name,sku,price,longDescription,mainImagePathsData',
    },
    PAGE: {
      HOME_SELECT: 'name,slides,promotionalBanners,products',
      HOME_WHERE: [{"type":"and","value":[{"type":"equals","attribute":"name","value":"Home"}]}],
    },
  },
} as const;

// Если нужны дополнительные форматы данных, их можно создать здесь же
export const getFullEndpoint = (endpoint: keyof typeof API_CONFIG.ENDPOINTS) => 
  `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS[endpoint]}`;

// Или другие вспомогательные функции/константы 