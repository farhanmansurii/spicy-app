"use client";
import * as React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { fetchData } from "@/utils/helper";
import { Search, SearchIcon } from "lucide-react";
import Link from "next/link";

interface SearchResult {
  id: string;
  title: {
    english: string;
    userPreferred: string;
  };
}

export function SearchBar() {
  const [open, setOpen] = React.useState(false);
  const [term, setTerm] = React.useState("");
  const [results, setResults] = React.useState<SearchResult[]>([]);

  // Throttle the search by using a flag
  const searchInProgress = React.useRef(false);

  const handleSearch = async (searchTerm: string) => {
    if (searchInProgress.current) {
      return;
    }

    searchInProgress.current = true;
    try {
      const res = await fetchData(`advanced-search?query=${searchTerm}`);
      setResults(res.results);
    } catch (err) {
      console.error(err);
    } finally {
      searchInProgress.current = false;
    }
  };

  const down = (e: React.KeyboardEvent) => {
    if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setOpen((open) => !open);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    setTerm(newTerm);

    // Throttle the search by checking if a previous search is in progress
    if (!searchInProgress.current) {
      handleSearch(newTerm);
    }
  };

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="bg-primary rounded-full p-2.5"
      >
        <SearchIcon />
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <form>
          <div
            className="flex items-center border-b  border-primary/30 px-3"
            cmdk-input-wrapper=""
          >
            <Search className="mr-2 h-4 w-4 text-primary shrink-0 " />

            <input
              value={term}
              onChange={(e) => handleInputChange(e)}
              className={
                "flex h-14 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              }
            />
          </div>

          <CommandList>
            {results.length === 0 ? (
              <CommandEmpty>No results found.</CommandEmpty>
            ) : (
              <>
                <CommandGroup heading="Suggestions"></CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Top Results">
                  {results.map((result, index) => (
                    <CommandItem key={result.id}>
                      <Link
                        onClick={() => {
                          setOpen(false);
                          setResults([]);
                        }}
                        href={`/anime/${result.id}`}
                      >
                        {result.title.english || result.title.userPreferred}
                      </Link>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </form>
      </CommandDialog>
    </>
  );
}
