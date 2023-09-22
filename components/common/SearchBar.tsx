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
import { Button } from "../ui/button";
import { fetchData } from "@/utils/helper";
import { Search, SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function SearchBar() {
  const [open, setOpen] = React.useState(false);
  const [term, setTerm] = React.useState("");
  const [results, setResults] = React.useState([]);

  const handleSearch = async (event: any) => {
    event.preventDefault();
    try {
      setTimeout(async () => {
        const res = await fetchData(`advanced-search?query=${term}`);
        setResults(res.results);
        console.log(res.results);
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };

  // Create a callback function using useCallback
  const handleSearchCallback = React.useCallback(handleSearch, [term]);

  const down = (e: any) => {
    if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setOpen((open) => !open);
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="bg-primary rounded-full p-2.5 "
      >
        <SearchIcon />
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <form onChange={handleSearchCallback}>
          <CommandInput
            value={term}
            onValueChange={(e) => setTerm(e.target.value)}
            className={
              "flex h-11 w-full rounded-lg bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            }
          />
          <CommandList>
            {results.length === 0 ? (
              <CommandEmpty>No results found.</CommandEmpty>
            ) : (
              <>
                <CommandGroup heading="Suggestions"></CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Results">
                  {results.map((result, index) => (
                    <CommandItem key={index}>
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
