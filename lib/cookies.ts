'use client';

export type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_CONSENT_KEY = 'cookie-consent';

export function getCookiePreferences(): CookiePreferences | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as CookiePreferences;
  } catch {
    return null;
  }
}

export function hasAcceptedCookies(): boolean {
  const preferences = getCookiePreferences();
  return (preferences?.necessary && (preferences?.analytics || preferences?.marketing)) || false;
}

export function canUseAnalytics(): boolean {
  const preferences = getCookiePreferences();
  return preferences?.analytics || false;
}

export function canUseMarketing(): boolean {
  const preferences = getCookiePreferences();
  return preferences?.marketing || false;
}

// Function to initialize analytics (e.g., Google Analytics)
export function initializeAnalytics() {
  if (!canUseAnalytics()) return;

  // Add your analytics initialization code here
  // Example:
  // window.gtag('consent', 'update', {
  //   analytics_storage: 'granted'
  // });
}

// Function to initialize marketing cookies
export function initializeMarketing() {
  if (!canUseMarketing()) return;

  // Add your marketing cookie initialization code here
  // Example:
  // window.fbq('consent', 'grant');
}

// Function to clear non-necessary cookies
export function clearNonNecessaryCookies() {
  const preferences = getCookiePreferences();

  if (!preferences?.analytics) {
    // Clear analytics cookies
    // Example:
    // document.cookie = '_ga=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  if (!preferences?.marketing) {
    // Clear marketing cookies
    // Example:
    // document.cookie = '_fbp=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}
