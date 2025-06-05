'use client';

import { Separator } from '@/components/ui/separator';
import { useAppForm } from '@/hooks/form';
import { getCookiePreferences, setCookiePreferences } from '@/lib/cookies';
import { z } from 'zod';

type CookieSetting = 'accept-all' | 'reject-all' | 'analytics-only' | 'marketing-only';

function getDefaultCookieSettings(cookieSettings: ReturnType<typeof getCookiePreferences>): CookieSetting {
  if (!cookieSettings) return 'reject-all';

  const { necessary, analytics, marketing } = cookieSettings;
  if (!necessary) return 'reject-all';

  if (analytics && marketing) return 'accept-all';
  if (analytics) return 'analytics-only';
  if (marketing) return 'marketing-only';

  return 'reject-all';
}

function getCookiePreferencesFromSetting(setting: CookieSetting) {
  const base = { necessary: true };

  switch (setting) {
    case 'accept-all':
      return { ...base, analytics: true, marketing: true };
    case 'reject-all':
      return { ...base, analytics: false, marketing: false };
    case 'analytics-only':
      return { ...base, analytics: true, marketing: false };
    case 'marketing-only':
      return { ...base, analytics: false, marketing: true };
  }
}

export function ProfilePreferences() {
  const cookieSettings = getCookiePreferences();
  const form = useAppForm({
    defaultValues: {
      notifyRatings: false,
      notifyWatchlist: false,
      cookieSettings: getDefaultCookieSettings(cookieSettings),
    },
    validators: {
      onChange: z.object({
        notifyRatings: z.boolean(),
        notifyWatchlist: z.boolean(),
        cookieSettings: z.union([
          z.literal('accept-all'),
          z.literal('reject-all'),
          z.literal('analytics-only'),
          z.literal('marketing-only'),
        ]),
      }),
    },
    onSubmit: async ({ value }) => {
      console.log(value.notifyRatings, value.notifyWatchlist);
      setCookiePreferences(getCookiePreferencesFromSetting(value.cookieSettings));
    },
  });

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <section>
        <h2 className="text-lg font-semibold">Email Notifications</h2>
        <div className="mt-2 space-y-2">
          <form.AppField
            name="notifyRatings"
            children={field => <field.CheckboxField label="Notify me when someone rates my reviews" />}
          />
          <form.AppField
            name="notifyWatchlist"
            children={field => <field.CheckboxField label="Notify me about watchlist updates" />}
          />
        </div>
      </section>

      <Separator className="my-4" />

      <section>
        <h2 className="text-lg font-semibold">Cookie Settings</h2>
        <p className="text-muted-foreground mt-2 text-xs">
          We use cookies to improve your experience. By clicking &quot;Accept all&quot;, you agree to the use of cookies
          for marketing and analytics. Necessary cookies are used to ensure the site works as expected and to provide
          essential features.
        </p>
        <div className="mt-4">
          <form.AppField
            name="cookieSettings"
            children={field => (
              <field.RadioField
                label="Cookie Consent"
                options={[
                  { label: 'Accept all', value: 'accept-all' },
                  { label: 'Reject all', value: 'reject-all' },
                  { label: 'Analytics only', value: 'analytics-only' },
                  { label: 'Marketing only', value: 'marketing-only' },
                ]}
              />
            )}
          />
        </div>
      </section>

      <form.AppForm>
        <form.SubscribeButton label="Save Preferences" />
      </form.AppForm>
    </form>
  );
}
