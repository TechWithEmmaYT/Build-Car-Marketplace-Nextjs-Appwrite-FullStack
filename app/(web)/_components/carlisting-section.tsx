import React from "react";
import CarCard from "@/components/CardCard";
import { CarType, CategoryType } from "@/@types/index.type";
import { Button } from "@/components/ui/button";
import { cars } from "@/constants/cars";

const CATEGORIES: CategoryType[] = [
  { id: "1", name: "All Brand", slug: "all-brand" },
  { id: "2", name: "Coupe", slug: "coupe" },
  { id: "3", name: "Hatchback", slug: "hatchback" },
  { id: "4", name: "Sport", slug: "sport" },
  { id: "5", name: "MPV", slug: "mpv" },
  { id: "6", name: "SUV", slug: "suv" },
  { id: "7", name: "Sedan", slug: "sedan" },
  { id: "8", name: "Van", slug: "van" },
  { id: "9", name: "Wagon", slug: "wagon" },
];

const CarListing = () => {
  const [activeCategory, setActiveCategory] = React.useState<CategoryType>(
    CATEGORIES[0]
  );

  return (
    <div className="w-full pt-4 pb-14">
      <div className="w-full max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-4 overflow-x-auto ">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              className={`text-gray-700 transition font-medium px-3 py-2 border-b-2 
                ${
                  activeCategory.id === category.id
                    ? "border-black text-black"
                    : "border-transparent hover:border-black hover:text-black"
                }`}
              onClick={() => setActiveCategory(category)}
            >
              {category.name}
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
