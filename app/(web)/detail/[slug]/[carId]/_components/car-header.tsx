import React from "react";
import { Badge } from "@/components/ui/badge";
import { CogIcon, FuelIcon, GaugeIcon, TagIcon } from "lucide-react";

const CarHeader = () => {
  return (
    <div>
      <div className="mb-3">
        <h1 className="text-[32px] font-bold">
          {"Mercedes-Benz S-Class 2014 Black"}
        </h1>
        <p className="text-sm text-gray-500 font-medium -mt-1">
          Luxury SUV for sale
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Badge
          variant="outline"
          className="border-primary gap-1.5 !font-medium py-1"
        >
          <FuelIcon className="size-3.5" />
          Petrol
        </Badge>
        <Badge
          variant="outline"
          className="border-primary gap-1.5 !font-medium py-1"
        >
          <GaugeIcon className="size-3.5" />
          1500 km/h
        </Badge>
        <Badge
          variant="outline"
          className="border-primary gap-1.5 !font-medium py-1"
        >
          <TagIcon className="size-3.5" />
          New
        </Badge>
        <Badge
          variant="outline"
          className="border-primary gap-1.5 !font-medium py-1 "
        >
          <CogIcon className="size-3.5" />
          Automatic
        </Badge>
      </div>
    </div>
  );
};

export default CarHeader;
