export const customInstance = async <T>(url: string, config?: RequestInit): Promise<T> => {
  const response = await fetch(url, config);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const contentType = response.headers.get('content-type');
  
  // Handle CSV/text responses
  if (contentType?.includes('text/csv') || contentType?.includes('text/plain')) {
    return (await response.text()) as T;
  }
  
  // Handle JSON responses
  return response.json();
};
