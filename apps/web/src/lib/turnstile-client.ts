// Client-side helper for loading Cloudflare Turnstile and running the widget.
const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
const SITE_KEY = (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined) ?? '';

let loaded = false;
let loadPromise: Promise<void> | null = null;

export function isTurnstileConfigured(): boolean {
  return Boolean(SITE_KEY);
}

export function loadTurnstile(): Promise<void> {
  if (!SITE_KEY || loaded) return Promise.resolve();
  if (loadPromise) return loadPromise;
  loadPromise = new Promise<void>((resolve) => {
    const existing = document.querySelector('script[data-turnstile]');
    if (existing) {
      resolve();
      return;
    }
    const s = document.createElement('script');
    s.src = SCRIPT_URL;
    s.async = true;
    s.defer = true;
    s.dataset.turnstile = '1';
    s.onload = () => {
      loaded = true;
      resolve();
    };
    document.head.appendChild(s);
  });
  return loadPromise;
}

export function renderTurnstile(
  el: HTMLElement,
  callback: (token: string | null) => void
): { reset: () => void; remove: () => void } | null {
  if (!SITE_KEY) {
    callback(null);
    return null;
  }
  if (!(window as unknown as { turnstile?: unknown }).turnstile) return null;

  const ts = (window as unknown as { turnstile: { render: Function; reset: Function; remove: Function } }).turnstile;
  const widgetId = ts.render(el, {
    sitekey: SITE_KEY,
    theme: 'auto',
    'error-callback': () => callback(null),
    'expired-callback': () => callback(null),
    callback: (token: string) => callback(token)
  });
  return {
    reset: () => ts.reset(widgetId),
    remove: () => ts.remove(widgetId)
  };
}