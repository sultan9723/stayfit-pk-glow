// src/lib/api.ts

export function getApiBase(): string {
  let base = import.meta.env.VITE_API_BASE as string | undefined;

  if (!base || !base.trim()) {
    // Only fallback to localhost in dev mode
    if (import.meta.env.MODE === "development") {
      return "http://localhost:3001";
    }
    // In production, fail clearly if it's missing
    throw new Error("VITE_API_BASE is not defined in production!");
  }

  base = base.trim();

  // If protocol missing, default to https://
  if (!/^https?:\/\//i.test(base)) {
    base = `https://${base}`;
  }

  // Remove trailing slash
  base = base.replace(/\/$/, "");
  return base;
}

export function buildApiUrl(path: string): string {
  const base = getApiBase();
  if (!path.startsWith("/")) path = `/${path}`;
  return `${base}${path}`;
}