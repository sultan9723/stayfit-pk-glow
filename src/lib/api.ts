export function getApiBase(): string {
  let base = (import.meta as any)?.env?.VITE_API_BASE as string | undefined;
  if (!base || typeof base !== 'string' || !base.trim()) {
    // Sensible dev default to avoid hitting the frontend origin
    return 'http://localhost:3001';
  }
  base = base.trim();
  // If protocol missing, default to http://
  if (!/^https?:\/\//i.test(base)) {
    base = `http://${base}`;
  }
  // Remove trailing slash
  base = base.replace(/\/$/, '');
  return base;
}

export function buildApiUrl(path: string): string {
  const base = getApiBase();
  if (!path.startsWith('/')) path = `/${path}`;
  return base ? `${base}${path}` : path;
}
