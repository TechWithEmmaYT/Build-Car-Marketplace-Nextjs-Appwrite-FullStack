import React from "react";
import CarCard from "@/components/CardCard";
import { Button } from "@/components/ui/button";
import { CAR_BRAND_OPTIONS, cars } from "@/constants/cars";

const BRANDS = [{ value: "all", label: "All Brand" }, ...CAR_BRAND_OPTIONS];

const CarListing = () => {
  const [active, setActive] = React.useState(BRANDS[0]?.value);

  return (
    <div className="w-full pt-4 pb-14">
      <div className="w-full max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-4 overflow-x-auto ">
          {BRANDS.map((item, index) => (
            <button
              key={index}
              className={`text-gray-700 transition font-medium px-3 py-2 border-b-2 
                ${
                  item.value === active
                    ? "border-black text-black"
                    : "border-transparent hover:border-black hover:text-black"
                }`}
              onClick={() => setActive(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Cars */}
        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6 md:px-0">
          {cars.map((car) => (
            <CarCard key={car.name} {...car} />
          ))}
        </div>

        <div className="flex mt-4 justify-center">
          <Button
            size="lg"
            className="uppercase font-semibold py-3 px-10 rounded-lg !h-auto"
          >
            View More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarListing;
