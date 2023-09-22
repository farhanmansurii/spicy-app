import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

interface EpisodeRangeSelectorProps {
  range: { start: number; end: number };
  handleRangeChange: (newRange: string) => void;
  totalEpisodes: number;
}

export default function EpisodeRangeSelector(props: EpisodeRangeSelectorProps) {
  const { range, handleRangeChange, totalEpisodes } = props;

  const itemsPerPage = 25;
  const rangeOptions: string[] = [];

  for (let i = 0; i < totalEpisodes; i += itemsPerPage) {
    const start = i + 1;
    const end = Math.min(i + itemsPerPage, totalEpisodes);
    rangeOptions.push(`${start}-${end}`);
  }

  return (
    <div>
      <Select>
        <SelectTrigger className="w-[200px]">
          <SelectValue
            placeholder={
              range.start > 1
                ? "Episodes " + (range.start+1) + " - " + range.end
                : `Select Episode Range`
            }
          />
        </SelectTrigger>
        <SelectContent className="max-h-[300px] rounded border-primary overflow-y-auto">
          <SelectGroup className="overflow-scroll">
            {rangeOptions.map((range, index) => (
              <div
                className="relative flex w-full cursor-default select-none items-center  py-2.5 pl-2 border-b-[0.2px] border-primary pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                key={index}
                onClick={() => handleRangeChange(range)}
              >
                Episodes {range}
              </div>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
