export const customFetch = <T>(
  url: string,
  config?: RequestInit
): Promise<T> => {
  return fetch(url, config).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  });
};

export default customFetch;
