"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import NavBreadCrumb from "@/components/NavBreadCrumb";
import useFilters from "@/hooks/use-filter";
import { getAllCarListingQueryFn } from "@/lib/fetcher";
import Filters from "./Filters";
import AllListings from "./all-listings";

const SearchContent = () => {
  const { filters } = useFilters();

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
  return (
    <div className="space-y-3">
      {/* Breadcrumb */}
      <NavBreadCrumb breadcrumbItems={breadcrumbItems} />
      {/* Filters and Results Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Filters Sidebar */}
        <Filters />

        {/* All Listings */}
        <AllListings listings={listings} isPending={isPending} />
      </div>
    </div>
  );
};

export default SearchContent;
