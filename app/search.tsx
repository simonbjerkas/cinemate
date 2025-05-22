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

import { Movie } from "@/lib/types";
import { useDebouncedCallback } from "@/lib/hooks";
import { searchMovies } from "@/lib/api";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Search() {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [open, setOpen] = useState(false);

  const debouncedSearch = useDebouncedCallback(async (searchQuery) => {
    if (typeof searchQuery !== "string") return;
    if (searchQuery.length < 3) return;
    setIsSearching(true);
    try {
      const { results } = await searchMovies(searchQuery);
      results.sort((a, b) => b.popularity - a.popularity);
      setSearchResults(results.slice(0, 5));
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, 500);

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
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search movies..."
          onValueChange={debouncedSearch}
        />
        <CommandList>
          <CommandEmpty>
            {isSearching ? (
              <div className="flex items-center justify-center py-6">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            ) : (
              "No results found."
            )}
          </CommandEmpty>
          {searchResults.length > 0 && (
            <CommandGroup>
              {searchResults.map((result) => (
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
