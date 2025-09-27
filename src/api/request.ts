import type { ApiServerResponse } from '../types.ts';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
}

export async function apiRequest<T>(
  url: string,
  options: RequestOptions = {},
): Promise<ApiServerResponse<T>> {
  const defaultOptions: RequestInit = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  if (options.body) {
    defaultOptions.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}
