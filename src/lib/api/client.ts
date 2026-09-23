const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    }
  );

  if (!response.ok) {
    let message = "Something went wrong";

    try {
      const error = await response.json();

      message =
        error.detail ||
        error.message ||
        message;
    } catch {
      // Ignore invalid error response
    }

    throw new Error(message);
  }

  return response.json();
}