"use client";

import React from "react";
import NavBreadCrumb from "@/components/NavBreadCrumb";
import CarCarousel from "./_components/car-carousel";
import { slugToCarName } from "@/lib/helper";
import CarDetails from "./_components/car-details";
import ShopInfo from "./_components/shop-info";
import CarHeader from "./_components/car-header";
import { getSingleListingQueryFn } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import { ListingType } from "@/@types/api.type";

const Details = ({ params }: { params: { slug: string; carId: string } }) => {
  const { slug, carId } = params;
  const carName = slugToCarName(slug);

  const { data, isPending, isError } = useQuery({
    queryKey: ["listing", carId],
    queryFn: () => getSingleListingQueryFn(carId),
  });
  const listing = data?.listing as ListingType;

  const breadcrumbItems = [
    { label: "Auto Hunt", href: "/" },
    { label: "Cars", href: "/search" },
    { label: carName },
  ];

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
            isPending={isPending || isError}
          />

          <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-5">
            <div className="pt-1">
              <CarCarousel
                imageUrls={listing?.imageUrls}
                isPending={isPending || isError}
              />
              <CarDetails listing={listing} isPending={isPending || isError} />
            </div>
            <div className="pt-0">
              <ShopInfo
                displayTitle={listing?.displayTitle}
                price={listing?.price}
                shopId={listing?.shop?.$id || ""}
                shopName={listing?.shop?.shopName || ""}
                shopOwnerUserId={listing?.shop?.userId || ""}
                description={listing?.shop?.description || ""}
                isPending={isPending || isError}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Details;
