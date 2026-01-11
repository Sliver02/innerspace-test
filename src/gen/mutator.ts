export const customInstance = async <T>(
  config: RequestInit & { url: string },
  options?: RequestInit
): Promise<T> => {
  const { url, ...requestInit } = config;

  const response = await fetch(url, {
    ...requestInit,
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const contentType = response.headers.get("content-type");
  let data;

  // Handle CSV/text responses - don't parse as JSON
  if (
    contentType?.includes("text/csv") ||
    contentType?.includes("text/plain")
  ) {
    data = await response.text();
  }
  // Handle JSON responses
  else if (contentType?.includes("application/json")) {
    data = await response.json();
  }
  // Default to text for unknown types
  else {
    const body = await response.text();
    data = body ? JSON.parse(body) : {};
  }

  // Return just the data, typed as T
  return data as T;
};
