"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import NavBreadCrumb from "@/components/NavBreadCrumb";
import useFilters from "@/hooks/use-filter";
import { getAllCarListingQueryFn } from "@/lib/fetcher";
import Filters from "./Filters";
import AllListings from "./all-listings";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const SearchContent = () => {
  const { filters } = useFilters();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: [
      "all-cars",
      filters.brand,
      filters.model,
      filters.color,
      filters.price,
      filters.yearMin,
      filters.yearMax,
      filters.keyword,
      filters.condition,
    ],
    queryFn: () =>
      getAllCarListingQueryFn({
        brand: filters.brand,
        model: filters.model,
        color: filters.color,
        price: filters.price,
        condition: filters.condition,
        year_min: filters.yearMin,
        year_max: filters.yearMax,
        keyword: filters.keyword,
      }),
    staleTime: 0,
  });

  const listings = data?.listings || [];

  const breadcrumbItems = [
    { label: "Auto Hunt", href: "/" },
    { label: `${listings?.length || 0} results cars found` },
  ];

  const onFilterOpen = () => {
    setIsFiltersOpen(true);
  };
  return (
    <div className="space-y-3">
      {/* Breadcrumb */}
      <NavBreadCrumb breadcrumbItems={breadcrumbItems} />
      {/* Filters and Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Mobile Filter Button */}
        <div className="lg:hidden">
          <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <SheetContent
              side="left"
              className="w-[300px] !p-0 sm:w-[400px] overflow-y-auto"
            >
              <Filters />
            </SheetContent>
          </Sheet>
        </div>
        {/* Filters (Desktop) */}
        <div className="hidden lg:block col-span-1">
          <Filters />
        </div>

        {/* All Listings */}
        <div className="col-span-1 lg:col-span-3">
          <AllListings
            listings={listings}
            isPending={isPending}
            onFilterOpen={onFilterOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchContent;
