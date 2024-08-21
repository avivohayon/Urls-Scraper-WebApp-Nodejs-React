export async function makeProtectedRequest(url: string, method: 'POST' | 'PUT' | 'DELETE', data?: any) {
    const csrfToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('XSRF-TOKEN='))?.split('=')[1];
  
    if (!csrfToken) {
      throw new Error('CSRF token is not available');
    }
  
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': csrfToken,
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Request failed');
    }
  
    return response.json();
  }
  