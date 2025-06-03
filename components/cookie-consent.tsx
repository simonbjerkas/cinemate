'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

import { cn } from '@/lib/utils';
import {
  getCookiePreferences,
  type CookiePreferences,
  clearNonNecessaryCookies,
  initializeAnalytics,
  initializeMarketing,
} from '@/lib/cookies';

import { useState, useEffect } from 'react';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true as these are required
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const storedPreferences = getCookiePreferences();
    if (!storedPreferences) {
      setShowBanner(true);
    } else {
      setPreferences(storedPreferences);
      // Initialize services based on preferences
      if (storedPreferences.analytics) {
        initializeAnalytics();
      }
      if (storedPreferences.marketing) {
        initializeMarketing();
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    setShowBanner(false);
    // Initialize all services
    initializeAnalytics();
    initializeMarketing();
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    setShowBanner(false);
    setShowPreferences(false);

    // Clear any cookies that are no longer allowed
    clearNonNecessaryCookies();

    // Initialize services based on new preferences
    if (preferences.analytics) {
      initializeAnalytics();
    }
    if (preferences.marketing) {
      initializeMarketing();
    }
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(onlyNecessary);
    localStorage.setItem('cookie-consent', JSON.stringify(onlyNecessary));
    setShowBanner(false);
    // Clear all non-necessary cookies
    clearNonNecessaryCookies();
  };

  if (!showBanner) return null;

  return (
    <>
      <div
        className={cn(
          'bg-background fixed right-0 bottom-0 left-0 z-[100] border-t p-4 shadow-lg',
          'animate-in slide-in-from-bottom duration-300',
        )}
      >
        <div className="container mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Cookie Settings</h3>
            <p className="text-muted-foreground text-sm">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
              By clicking &quot;Accept All&quot;, you consent to our use of cookies.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="outline" onClick={() => setShowPreferences(true)}>
              Customize
            </Button>
            <Button variant="outline" onClick={handleRejectAll}>
              Reject All
            </Button>
            <Button onClick={handleAcceptAll}>Accept All</Button>
          </div>
        </div>
      </div>

      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cookie Preferences</DialogTitle>
            <DialogDescription>
              Manage your cookie preferences. You can change these settings at any time.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="necessary"
                checked={preferences.necessary}
                disabled
                onCheckedChange={(checked: boolean) => setPreferences(prev => ({ ...prev, necessary: checked }))}
              />
              <Label htmlFor="necessary" className="flex flex-col">
                <span>Necessary Cookies</span>
                <span className="text-muted-foreground text-sm">
                  Required for the website to function properly. Cannot be disabled.
                </span>
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="analytics"
                checked={preferences.analytics}
                onCheckedChange={(checked: boolean) => setPreferences(prev => ({ ...prev, analytics: checked }))}
              />
              <Label htmlFor="analytics" className="flex flex-col">
                <span>Analytics Cookies</span>
                <span className="text-muted-foreground text-sm">
                  Help us understand how visitors interact with our website.
                </span>
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="marketing"
                checked={preferences.marketing}
                onCheckedChange={(checked: boolean) => setPreferences(prev => ({ ...prev, marketing: checked }))}
              />
              <Label htmlFor="marketing" className="flex flex-col">
                <span>Marketing Cookies</span>
                <span className="text-muted-foreground text-sm">
                  Used to track visitors across websites to display relevant advertisements.
                </span>
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleRejectAll}>
              Reject All
            </Button>
            <Button onClick={handleSavePreferences}>Save Preferences</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
