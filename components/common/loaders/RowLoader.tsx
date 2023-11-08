import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface RowSkeletonProps {}

const RowSkeleton = ({}: RowSkeletonProps) => {
  return (
    <>
      <div className="w-11/12 mx-auto mb-10">
        <div
          className="flex my-2 items-center
      justify-between"
        >
          <Skeleton className="text-2xl  my-2 mx-2 w-34"/>
          <div className="flex gap-3">
            <Button size="sm" className=" rounded-full w-8 h-8 p-2">
              <ChevronLeft />
            </Button>
            <Button size="sm" className=" rounded-full w-8 h-8 p-2">
              <ChevronRight />
            </Button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            overflowX: "scroll",
            gap: "2px",
            scrollbarWidth: "none", // Hide the scrollbar in Firefox
            WebkitOverflowScrolling: "touch", // Enable smooth scrolling on iOS
          }}
        >
          {[...Array(10)].map((_, index) => (
            <Skeleton
              className=" border border-transparent hover:border-primary w-36 h-52 flex-none lg:w-[13rem] lg:h-[15rem]  "
              key={index}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RowSkeleton;
