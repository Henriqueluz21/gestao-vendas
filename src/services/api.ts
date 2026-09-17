const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(
  endpoint: string,
  options?: RequestInit
) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(
      `API request failed with status ${response.status}`
    );
  }

  return response.json();
}