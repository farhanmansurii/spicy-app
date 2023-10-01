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
import { DebouncedInput } from "./DebouncedInput";
import { Button } from "../ui/button";

export function SearchBar() {
  const [open, setOpen] = React.useState(false);
  const [term, setTerm] = React.useState("");
  const [results, setResults] = React.useState<Anime[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  // Throttle the search by using a flag
  const searchInProgress = React.useRef(false);
  async function searchShowsByQuery(value: string) {
    setTerm(value);
    setLoading(true);
    if (value.length >= 3) {
      const shows = await fetchData(`advanced-search?query=${value}`);
      setResults(shows.results);
    }
    setLoading(false);
  }
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

  const toggleOpen = () => {
    setOpen((prev) => !prev);
    setResults([]);
    setTerm("");
  };
  return (
    <>
      <Button
        onClick={() => toggleOpen()}
        size="icon"
        className="rounded-full w-10 h-10 md:w-12 md:h-12 "
      >
        <Search className=" p-1 rounded" />
      </Button>
      <CommandDialog open={open} onOpenChange={toggleOpen}>
        <form>
          <div className="flex items-center border-b  border-secondary px-3">
            <DebouncedInput
              setQuery={setTerm}
              setData={setResults}
              onChange={(value) => void searchShowsByQuery(value.toString())}
              value={term}
            />
          </div>
        </form>

        <CommandList className=" ">
          {term.length > 0 ? (
            results.length === 0 ? (
              loading ? (
                <CommandEmpty>Loading</CommandEmpty>
              ) : (
                <CommandEmpty>No results found.</CommandEmpty>
              )
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
                <CommandGroup className="py-2" heading="Recent Searches">
                  {recentlySearched.map((result) => (
                    <Link
                      key={result.id}
                      onClick={() => {
                        handleAddToHistory(result);
                        toggleOpen();
                      }}
                      href={`/anime/${result.id}`}
                    >
                      <CommandItem className="">
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
