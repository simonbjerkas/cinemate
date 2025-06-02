'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export function useModifySearchParams() {
  const router = useRouter();
  const oldSearchParams = useSearchParams();
  const pathname = usePathname();
  const searchParams = useMemo(() => new URLSearchParams(oldSearchParams.toString()), [oldSearchParams]);

  const removeQueryParam = useCallback(
    (name: string) => {
      searchParams.delete(name);
      const newUrl = `${pathname}?${searchParams.toString()}`;
      router.replace(newUrl);
    },
    [pathname, searchParams, router],
  );

  const setQueryParam = useCallback(
    (name: string, value: string) => {
      searchParams.set(name, value);
      const newUrl = `${pathname}?${searchParams.toString()}`;
      router.replace(newUrl);
    },
    [pathname, searchParams, router],
  );

  const updateQueryParam = useCallback(
    (name: string, value: string) => {
      searchParams.set(name, value);
      const newUrl = `${pathname}?${searchParams.toString()}`;
      router.replace(newUrl);
    },
    [pathname, searchParams, router],
  );

  return { searchParams, removeQueryParam, setQueryParam, updateQueryParam };
}
