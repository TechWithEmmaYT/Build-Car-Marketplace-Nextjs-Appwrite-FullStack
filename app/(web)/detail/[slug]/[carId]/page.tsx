"use client";

import React from "react";
import NavBreadCrumb from "@/components/NavBreadCrumb";
import CarCarousel from "./_components/car-carousel";
import { slugToCarName } from "@/lib/helper";
import CarDetails from "./_components/car-details";
import SellerInfo from "./_components/seller-info";
import CarHeader from "./_components/car-header";
import { getSingleListingMutationFn } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import { ListingType } from "@/@types/api.type";

const Details = ({ params }: { params: { slug: string; carId: string } }) => {
  const { slug, carId } = params;
  const carName = slugToCarName(slug);

  const { data, isPending } = useQuery({
    queryKey: ["listing", carId],
    queryFn: () => getSingleListingMutationFn(carId),
  });
  const listing = data?.listing as ListingType;

  const breadcrumbItems = [
    { label: "Auto Hunt", href: "/" },
    { label: "Cars", href: "/search" },
    { label: carName },
  ];
  console.log(listing);

  return (
    <main className="container mx-auto px-4 pt-3 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-3">
          {/* Breadcrumb */}
          <NavBreadCrumb breadcrumbItems={breadcrumbItems} />

          {/* {Car Title} */}
          <CarHeader
            displayTitle={listing?.displayTitle}
            condition={listing?.condition}
            fuelType={listing?.fuelType}
            transmission={listing?.transmission}
            mileage={listing?.mileage || "0"}
            isPending={isPending}
          />

          <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-5">
            <div className="pt-1">
              <CarCarousel
                imageUrls={listing?.imageUrls}
                isPending={isPending}
              />
              <CarDetails listing={listing} isPending={isPending} />
            </div>
            <div className="pt-0">
              <SellerInfo />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Details;
