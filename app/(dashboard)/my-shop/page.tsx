"use client";
import React from "react";
import AllListing from "@/components/shop/all-isting";
import ShopInfo from "@/components/shop/shop-info";
import { useQuery } from "@tanstack/react-query";
import { getMyShopQueryFn } from "@/lib/fetcher";
import { ListingType } from "@/@types/api.type";

const MyShop = () => {
  const { data: shopData, isPending } = useQuery({
    queryKey: ["my-shop"],
    queryFn: getMyShopQueryFn,
  });
  const user = shopData?.user;
  const listings = shopData?.listings || ([] as ListingType[]);

  return (
    <main className="container mx-auto px-4 pt-3 pb-8">
      <div className="max-w-7xl mx-auto">
        <div
          className="grid grid-cols-1 items-stretch justify-stretch
           md:grid-cols-[305px_1fr] gap-5"
        >
          <div className="pt-1">
            <ShopInfo
              ownerName={user?.name}
              shopName={shopData?.shopName}
              shopId={shopData?.$id}
              description={shopData?.description}
              isShopOwner={true}
              isPending={isPending}
            />
          </div>
          <div className="pt-1">
            <AllListing listings={listings} isPending={isPending} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyShop;
