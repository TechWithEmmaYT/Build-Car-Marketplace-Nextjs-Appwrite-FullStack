import AllListing from "@/components/shop/all-isting";
import ShopInfo from "@/components/shop/shop-info";
import React from "react";

const Shop = () => {
  return (
    <main className="container mx-auto px-4 pt-3 pb-8 flex-1 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div
          className="grid grid-cols-1 flex-col-reverse md:grid-cols-[305px_1fr] 
        gap-5"
        >
          <div className="pt-1">
            <ShopInfo />
          </div>
          <div className="pt-1">
            <AllListing />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Shop;
