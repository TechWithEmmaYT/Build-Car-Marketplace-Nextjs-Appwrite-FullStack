"use client";
import React from "react";
import { Grid3x3, List } from "lucide-react";
import CarCard from "@/components/CardCard";
import { cars } from "@/constants/cars";

const MainContent = () => {
  const [layout, setLayout] = React.useState<"list" | "grid">("grid");

  return (
    <div className="col-span-9">
      <div className="w-full flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold">64 Cars Found</h2>
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
            ? "grid-cols-1 gap-4"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        }`}
      >
        {cars.map((car) => (
          <CarCard key={car.name} {...car} layout={layout} />
        ))}
      </div>
    </div>
  );
};

export default MainContent;
