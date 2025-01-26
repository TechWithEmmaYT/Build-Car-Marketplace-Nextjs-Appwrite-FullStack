"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterSelectProps {
  label: string;
  options: FilterOption[];
  placeholder: string;
  onChange: (value: string) => void;
}

const HeroFilter = () => {
  const router = useRouter();

  const [selectedFilters, setSelectedFilters] = React.useState<{
    brand?: string;
    condition?: string;
    model?: string;
    fuelType?: string;
    year?: string;
    price?: string;
  }>({});

  const filterOptions: Record<string, FilterOption[]> = {
    brands: [
      { label: "Toyota", value: "toyota" },
      { label: "Honda", value: "honda" },
      { label: "Ford", value: "ford" },
      { label: "BMW", value: "bmw" },
      { label: "Mercedes", value: "mercedes" },
    ],
    condition: [
      { label: "New", value: "new" },
      { label: "Old", value: "old" },
    ],
    price: [
      { label: "Under $10k", value: "<=10000" },
      { label: "$10,000 - $20,000", value: "10000-20000" },
      { label: "$20,000 - $30,000", value: "20000-30000" },
      { label: "Over $30k", value: ">=300000" },
    ],
    models: [
      { label: "Sedan", value: "sedan" },
      { label: "SUV", value: "suv" },
      { label: "Truck", value: "truck" },
      { label: "Coupe", value: "coupe" },
    ],
    fuelTypes: [
      { label: "Petrol", value: "petrol" },
      { label: "Diesel", value: "diesel" },
      { label: "Electric", value: "electric" },
      { label: "Hybrid", value: "hybrid" },
    ],
    years: [
      { label: "2023", value: "2023" },
      { label: "2022", value: "2022" },
      { label: "2021", value: "2021" },
      { label: "2020", value: "2020" },
      { label: "2019", value: "<=2019" },
    ],
  };

  const handleFilterChange = (
    key: keyof typeof selectedFilters,
    value: string
  ) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });
    router.push(`/search?${params.toString()}`);
  };

  return (
    <>
      <div className=" w-full flex flex-col gap-6 pt-6">
        <div className="w-full flex flex-wrap items-center justify-center gap-4">
          <FilterSelect
            label="Brand"
            options={filterOptions.brands}
            placeholder="Brand"
            onChange={(value) => handleFilterChange("brand", value)}
          />
          <FilterSelect
            label="Model"
            options={filterOptions.models}
            placeholder="Model"
            onChange={(value) => handleFilterChange("model", value)}
          />
          <FilterSelect
            label="Condition"
            options={filterOptions.condition}
            placeholder="Condition"
            onChange={(value) => handleFilterChange("condition", value)}
          />
          <FilterSelect
            label="Year"
            options={filterOptions.years}
            placeholder="Year"
            onChange={(value) => handleFilterChange("year", value)}
          />
          <FilterSelect
            label="Fuel"
            options={filterOptions.fuelTypes}
            placeholder="Fuel Type"
            onChange={(value) => handleFilterChange("fuelType", value)}
          />
          <FilterSelect
            label="Price"
            options={filterOptions.price}
            placeholder="Price Range"
            onChange={(value) => handleFilterChange("price", value)}
          />
        </div>
        <Button
          onClick={handleSearch}
          className="w-full lg:w-11/12 mx-auto flex items-center justify-between py-6"
        >
          <span className="flex items-center gap-1 font-light">
            <b className="font-bold">1,000</b>
            CAR LISTED
          </span>
          <span className="flex items-center gap-1 uppercase font-semibold">
            Search Now
            <ChevronRight />
          </span>
        </Button>
        <p className="text-muted-foreground text-sm text-center">
          Want to search more customized?
          <Link
            href="/search"
            className="text-primary underline font-bold ml-2"
          >
            Advanced Search
          </Link>
        </p>
      </div>
    </>
  );
};

const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  options,
  placeholder,
  onChange,
}) => {
  return (
    <div className="w-full lg:w-[28%]">
      <Select onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default HeroFilter;
