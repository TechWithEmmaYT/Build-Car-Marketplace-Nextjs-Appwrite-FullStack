"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cars } from "@/constants/cars";
import CarCard from "../CardCard";
import { Grid3x3, List } from "lucide-react";

const AllListing = () => {
  const [layout, setLayout] = React.useState<"list" | "grid">("list");
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
          <h2 className="text-xl font-bold">All Listing (10)</h2>

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
          {cars.map((car) => (
            <CarCard key={car.name} {...car} layout={layout} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AllListing;
