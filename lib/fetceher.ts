export async function fetcher<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Fetch error');
    return res.json();
  }
  