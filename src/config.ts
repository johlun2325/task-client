export interface AppConfig {
  apiBaseUrl: string;
}

let config: AppConfig;

export async function loadConfig(): Promise<void> {
  const res = await fetch('/config.json');
  config = await res.json();
}

export function getConfig(): AppConfig {
  if (!config) {
    throw new Error('Config not loaded');
  }
  return config;
}
