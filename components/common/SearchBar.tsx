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
import { CommandIcon, Search, SearchIcon } from "lucide-react";
import Link from "next/link";
import useAnimeStore from "@/store/animeStore";

export function SearchBar() {
  const [open, setOpen] = React.useState(false);
  const [term, setTerm] = React.useState("");
  const [results, setResults] = React.useState<Anime[]>([]);

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
  const { recentlySearched, loadRecentlySearched, addToRecentlySearched } =
    useAnimeStore();
  React.useEffect(() => {
    loadRecentlySearched();
  }, []);

  const handleAddToHistory = (anime: Anime) => {
    addToRecentlySearched(anime);
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

    if (!searchInProgress.current) {
      handleSearch(newTerm);
    }
  };

  const toggleOpen = () => {
    setOpen((prev) => !prev);
    setResults([]);
    setTerm("");
  };
  return (
    <>
      <div
        onClick={() => toggleOpen()}
        className="bg-primary rounded-full p-2.5"
      >
        <SearchIcon />
      </div>
      <CommandDialog open={open} onOpenChange={toggleOpen}>
        <form>
          <div className="flex items-center border-b  border-primary/30 px-3">
            <Search className="mr-2 h-4 w-4 text-primary shrink-0 " />

            <input
              value={term}
              onChange={(e) => handleInputChange(e)}
              className={
                "flex h-14 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              }
            />
          </div>
        </form>

        <CommandList className=" pb-1.5">
          {term.length > 0 ? (
            results.length === 0 ? (
              <CommandEmpty>No results found.</CommandEmpty>
            ) : (
              <>
                <CommandSeparator />
                <CommandGroup className=" " heading="Top Results">
                  {results.map((result, index) => (
                    <Link
                      key={result.id}
                      onClick={() => {
                        handleAddToHistory(result);
                        toggleOpen();
                      }}
                      href={`/anime/${result.id}`}
                    >
                      <CommandItem>
                        {result.title.english || result.title.userPreferred}
                      </CommandItem>
                    </Link>
                  ))}
                </CommandGroup>
              </>
            )
          ) : (
            <>
              {recentlySearched.length > 0 && (
                <CommandGroup heading="Recent Searches">
                  {recentlySearched.map((result) => (
                    <Link
                      key={result.id}
                      onClick={() => {
                        handleAddToHistory(result);
                        toggleOpen();
                      }}
                      href={`/anime/${result.id}`}
                    >
                      <CommandItem>
                        {result.title.english || result.title.userPreferred}
                      </CommandItem>
                    </Link>
                  ))}
                </CommandGroup>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
