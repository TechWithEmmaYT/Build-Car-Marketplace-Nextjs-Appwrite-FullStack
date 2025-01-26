import React from "react";
import AllListing from "@/components/shop/all-isting";
import ShopInfo from "@/components/shop/shop-info";

const MyShop = () => {
  return (
    <main className="container mx-auto px-4 pt-3 pb-8">
      <div className="max-w-7xl mx-auto">
        <div
          className="grid grid-cols-1 items-stretch justify-stretch
           md:grid-cols-[305px_1fr] gap-5"
        >
          <div className="pt-1">
            <ShopInfo isShopOwner={true} />
          </div>
          <div className="pt-1">
            <AllListing />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyShop;
