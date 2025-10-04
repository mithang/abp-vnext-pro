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
    const base64Payload = token.token.split('.')[1];
    // Add padding if needed for proper base64 decoding
    const paddedPayload = base64Payload + '='.repeat((4 - base64Payload.length % 4) % 4);
    
    // Simple base64 decode for React Native
    const decodedPayload = paddedPayload.replace(/-/g, '+').replace(/_/g, '/');
    const binaryString = decodedPayload.split('').map(char => {
      const code = char.charCodeAt(0);
      return code < 128 ? String.fromCharCode(code) : char;
    }).join('');
    
    // Manual base64 decode
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let result = '';
    let i = 0;
    
    while (i < paddedPayload.length) {
      const encoded1 = chars.indexOf(paddedPayload[i++]);
      const encoded2 = chars.indexOf(paddedPayload[i++]);
      const encoded3 = chars.indexOf(paddedPayload[i++]);
      const encoded4 = chars.indexOf(paddedPayload[i++]);
      
      const bitmap = (encoded1 << 18) | (encoded2 << 12) | (encoded3 << 6) | encoded4;
      
      result += String.fromCharCode((bitmap >> 16) & 255);
      if (encoded3 !== 64) result += String.fromCharCode((bitmap >> 8) & 255);
      if (encoded4 !== 64) result += String.fromCharCode(bitmap & 255);
    }
    
    const tokenPayload = JSON.parse(result);
    const expireTime = tokenPayload.exp * 1000; // Convert to milliseconds
    const now = new Date().valueOf();
    return now < expireTime;
  } catch (error) {
    // If JWT decoding fails, assume token is valid for now
    return true;
  }
}
