"use client";
import React from "react";
import { Grid3x3, List } from "lucide-react";
import CarCard from "@/components/CardCard";
import { ListingType } from "@/@types/api.type";
import EmptyState from "@/components/EmptyState";
import { CarListingSkeleton } from "@/components/skeleton-loader/carlisting-skeleton";

const AllListings = ({
  listings,
  isPending,
}: {
  listings: ListingType[];
  isPending: boolean;
}) => {
  const [layout, setLayout] = React.useState<"list" | "grid">("grid");

  return (
    <div className="col-span-9">
      <div className="w-full flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold">
          {listings?.length || 0} Cars Found
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

      {isPending ? (
        <CarListingSkeleton layout={layout} />
      ) : listings?.length === 0 ? (
        <EmptyState message="No Car found." />
      ) : (
        <div
          className={`w-full grid ${
            layout === "list"
              ? "grid-cols-1 gap-4" // List layout: single column
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" // Grid layout: multi-column
          }`}
        >
          {listings?.map((listing) => (
            <CarCard key={listing.$id} listing={listing} layout={layout} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllListings;
