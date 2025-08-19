
export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE || '',
    timeout: 10000,
  },
  app: {
    name: 'Bid-Alare',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  },
  features: {
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    enableDebugMode: process.env.NODE_ENV === 'development',
  },
  auth: {
    tokenExpiryBuffer: 5 * 60 * 1000, // 5 minutes in milliseconds
  },
};

export const isDevelopment = config.app.environment === 'development';
export const isProduction = config.app.environment === 'production';
