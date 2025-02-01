"use client";
import React from "react";
import { Grid3x3, List, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import CarCard from "../CardCard";
import { ListingType } from "@/@types/api.type";
import { Skeleton } from "../ui/skeleton";

const AllListing = ({
  listings,
  isPending,
}: {
  listings: ListingType[];
  isPending: boolean;
}) => {
  const [layout, setLayout] = React.useState<"list" | "grid">("grid");
  return (
    <Card
      className="shadow-none !bg-transparent rounded-[8px] border-none
     min-h-56"
    >
      <CardContent className="p-3">
        {/* <div className=" w-fullh-full text-center text-gray-500">
          No listing yet
        </div> */}
        <div className="w-full flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold">
            All Listing ({listings?.length || 0})
          </h2>

          <div className="flex items-center justify-center">
            <Grid3x3
              role="button"
              onClick={() => {
                setLayout("grid");
              }}
              className={`${layout === "grid" ? "text-primary" : ""}`}
            />
            <List
              role="button"
              onClick={() => {
                setLayout("list");
              }}
              className={`ml-2 ${layout === "list" ? "text-primary" : ""}`}
            />
          </div>
        </div>

        <div
          className={`grid ${
            layout === "list"
              ? "grid-cols-1 gap-4" // List layout: single column
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" // Grid layout: multi-column
          }`}
        >
          {isPending
            ? Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="w-full">
                  <Skeleton className="w-full h-48" />
                  <div className="flex flex-col gap-2 mt-2">
                    <Skeleton className="w-10/12 h-3" />
                    <Skeleton className="w-1/2 h-3" />
                  </div>
                </div>
              ))
            : listings?.map((listing) => (
                <CarCard key={listing.$id} listing={listing} layout={layout} />
              ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AllListing;
