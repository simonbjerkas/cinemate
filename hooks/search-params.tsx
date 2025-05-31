'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useModifySearchParams() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const removeQueryParam = useCallback(
    (name: string) => {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete(name);
      const newUrl = `${pathname}?${newParams.toString()}`;
      router.replace(newUrl);
    },
    [pathname, searchParams, router],
  );

  const setQueryParam = useCallback(
    (name: string, value: string) => {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set(name, value);
      const newUrl = `${pathname}?${newParams.toString()}`;
      router.replace(newUrl);
    },
    [pathname, searchParams, router],
  );

  const updateQueryParam = useCallback(
    (name: string, value: string) => {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set(name, value);
      const newUrl = `${pathname}?${newParams.toString()}`;
      router.replace(newUrl);
    },
    [pathname, searchParams, router],
  );

  return { searchParams, removeQueryParam, setQueryParam, updateQueryParam };
}
