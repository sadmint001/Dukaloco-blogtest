
export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const MOCK_USERS: any[] = [
  { id: 1, name: 'Admin User', role: 'admin', username: 'admin', email: 'admin@dukaloco.com' },
  { id: 2, name: 'Standard User', role: 'user', username: 'jdoe', email: 'jdoe@dukaloco.com' }
];

export const APP_CONFIG = {
  STALE_TIME: 1000 * 60 * 5, // 5 minutes
  RETRY_COUNT: 2,
};
