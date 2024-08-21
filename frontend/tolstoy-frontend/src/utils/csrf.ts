
export async function fetchCsrfToken(): Promise<string> {
  try {
    const response = await fetch('/api/csrf-token', { method: 'GET' });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch CSRF token: ${response.statusText}`);
    }
    const x = await response.json()
    // Extract token from cookie
    const cookieString = document.cookie;
    console.log(`Cookies: ${cookieString}`); // Log cookies for debugging
    console.log(`response: ${x}`); // Log cookies for debugging

    const token = cookieString
      .split('; ')
      .find(row => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1];

    if (token) {
      console.log(`CSRF Token: ${token}`); // Log token for debugging
      return token;
    } else {
      throw new Error('CSRF token not found in cookies');
    }
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    throw error; // Re-throw error for further handling if needed
  }
}
