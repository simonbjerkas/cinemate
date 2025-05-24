"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

import { useDebounce } from "@/hooks/debounce";
import { searchMovies } from "@/lib/api";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export default function Search() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { isFetching, isFetched, data } = useQuery({
    queryKey: ["search", debouncedSearchQuery],
    queryFn: async () => {
      if (debouncedSearchQuery.trim().length < 2) return [];
      const movies = await searchMovies(debouncedSearchQuery);
      const sortedMovies = movies.results.sort(
        (a, b) => b.popularity - a.popularity,
      );
      const slicedMovies = sortedMovies.slice(0, 5);
      console.log(slicedMovies);
      return slicedMovies;
    },
    enabled: searchQuery.trim().length > 2,
  });

  const handleSelect = (movieId: number) => {
    router.push(`/movies/${movieId}`);
    setOpen(false);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const showLoading = isFetching && debouncedSearchQuery.length >= 2;
  const showNoResults =
    isFetched &&
    debouncedSearchQuery.length >= 2 &&
    (!data || data.length === 0) &&
    !isFetching;
  const showResults = data && data.length > 0 && !isFetching;
  const showInitialMessage = debouncedSearchQuery.length < 2;

  return (
    <>
      <Button
        variant="outline"
        className="text-xs inline-flex justify-between w-full max-w-xs text-muted-foreground"
        onClick={() => setOpen(true)}
      >
        Search movies
        <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-xs">⌘</span>J
        </kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        commandProps={{ shouldFilter: false }}
      >
        <CommandInput
          placeholder="Search movies..."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          {showLoading && (
            <CommandEmpty>
              <div className="flex items-center justify-center py-6">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            </CommandEmpty>
          )}

          {showNoResults && <CommandEmpty>No results found.</CommandEmpty>}

          {showInitialMessage && (
            <CommandEmpty>Search for a movie...</CommandEmpty>
          )}

          {showResults && (
            <CommandGroup heading="Movies">
              {data.map((result) => (
                <CommandItem
                  key={result.id}
                  onSelect={() => handleSelect(result.id)}
                  className="flex justify-between"
                >
                  {result.title}
                  <span className="text-xs">
                    {result.release_date.split("-")[0]}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
