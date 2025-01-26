"use client";
import React from "react";
import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import FilterAccordionItem from "@/components/FilterAccordionItem";
import { Accordion } from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";

const Filters = () => {
  const [brand] = useQueryState("brand");
  const [model] = useQueryState("model");
  const [fuelType] = useQueryState("fuelType");
  const [year] = useQueryState("year");
  const [price] = useQueryState("price");
  const [carType] = useQueryState("carType");

  const [isOpen, setIsOpen] = React.useState({
    priceRange: true,
    fuelType: true,
    transmission: true,
    condition: true,
  });

  const yearRanges = [
    {
      min: 2024,
      max: 2028,
      label: "2024 - 2028",
      value: "2024-2028",
      adsCount: 3,
    }, // Added value and adsCount for example
    {
      min: 2019,
      max: 2023,
      label: "2019 - 2023",
      value: "2019-2023",
      adsCount: 5,
    },
    {
      min: 2014,
      max: 2018,
      label: "2014 - 2018",
      value: "2014-2018",
      adsCount: 2,
    },
    {
      min: 2009,
      max: 2013,
      label: "2009 - 2013",
      value: "2009-2013",
      adsCount: 7,
    },
    {
      min: 2004,
      max: 2008,
      label: "2004 - 2008",
      value: "2004-2008",
      adsCount: 1,
    },
    {
      min: 1999,
      max: 2003,
      label: "1999 - 2003",
      value: "1999-2003",
      adsCount: 4,
    },
  ];

  const fuelTypeOptions = ["Petrol", "Diesel", "Electric", "Hybrid"].map(
    (fuel) => ({ label: fuel, value: fuel.toLowerCase() })
  );

  const transmissionOptions = ["Automatic", "Manual"].map((trans) => ({
    label: trans,
    value: trans.toLowerCase(),
  }));

  const conditionOptions = ["Brand New", "Local Used"].map((cond) => ({
    label: cond,
    value: cond.toLowerCase(),
  }));

  const carBrandOptions = [
    "BMW",
    "Mercedes Benz",
    "Audi",
    "Toyota",
    "Honda",
    "Lexus",
    "Porsche",
    "Tesla",
    "Ford",
    "Volkswagen",
  ].map((brand) => ({ label: brand, value: brand.toLowerCase() }));

  console.log(brand, model, fuelType, year, price, carType);

  return (
    <div className="col-span-3 space-y-4">
      <div className="">
        {/* Filter Card */}
        <div className="b-categories-section mb-3">
          <div
            className="flex items-center justify-between rounded-[4px_4px_0_0] 
          bg-primary text-white p-[8px_16px]"
          >
            <h2 className="font-bold text-base">Filters</h2>
            <Button
              className="!h-auto text-white/80 font-light !py-0"
              variant="link"
            >
              Reset all
            </Button>
          </div>
          <Accordion type="single" collapsible defaultValue="brands">
            {/* Car Brands */}
            <FilterAccordionItem
              title="Car Brands"
              value="brands"
              filterType="checkbox"
              options={carBrandOptions}
              selectedValues={[]}
              onValuesChange={() => {}}
              hasSearch={true}
            />
          </Accordion>
        </div>

        <Accordion
          type="multiple"
          defaultValue={[
            "price-range",
            "fuel-type",
            "transmission",
            "condition",
            "year-of-manufacture",
          ]}
        >
          {/* Price Range */}
          <FilterAccordionItem
            title="Price Range"
            value="price-range"
            filterType="range"
            hasClearButton={false}
          >
            <div className="py-2">
              <Slider defaultValue={[33]} max={100} step={1} />
            </div>
          </FilterAccordionItem>

          {/* Fuel Type */}
          <FilterAccordionItem
            title="Fuel Type"
            value="fuel-type"
            filterType="checkbox"
            options={fuelTypeOptions}
            selectedValues={[]}
            onValuesChange={() => {}}
          />

          {/* Transmission */}
          <FilterAccordionItem
            title="Transmission"
            value="transmission"
            filterType="checkbox"
            options={transmissionOptions}
            selectedValues={[]}
            onValuesChange={() => {}}
          />

          {/* Condition */}
          <FilterAccordionItem
            title="Condition"
            value="condition"
            filterType="checkbox"
            options={conditionOptions}
            selectedValues={[]}
            onValuesChange={() => {}}
          />

          {/* Years of Manufacture */}
          <FilterAccordionItem
            title="Years of Manufacture"
            value="year-of-manufacture"
            filterType="radio"
            options={yearRanges}
            selectedValues={[]}
            onValuesChange={() => {}}
            hasClearButton
            minMaxInput
          />
        </Accordion>
      </div>
    </div>
  );
};

export default Filters;
