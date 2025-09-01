interface TokenWithExpiry {
  expire_time?: number;
  token?: string;
  [key: string]: any;
}

export function isTokenValid(token: TokenWithExpiry | null | undefined): boolean {
  if (!token || typeof token !== 'object') return false;
  
  // Check if token has the JWT token string
  if (!token.token) return false;
  
  // Check expiration time if available
  if (token.expire_time) {
    const now = new Date().valueOf();
    return now < token.expire_time;
  }
  
  // If no expire_time, try to decode JWT token to check expiration
  try {
    const tokenPayload = JSON.parse(atob(token.token.split('.')[1]));
    const expireTime = tokenPayload.exp * 1000; // Convert to milliseconds
    const now = new Date().valueOf();
    return now < expireTime;
  } catch (error) {
    return false;
  }
}
