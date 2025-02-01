import React from "react";
import { Badge } from "@/components/ui/badge";
import { CogIcon, FuelIcon, GaugeIcon, TagIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type CarHeaderProps = {
  displayTitle: string;
  condition: string;
  fuelType: string;
  transmission: string;
  mileage: string;
  isPending: boolean;
};

const CarHeader = ({
  displayTitle,
  condition,
  fuelType,
  transmission,
  mileage,
  isPending,
}: CarHeaderProps) => {
  return (
    <div>
      <div className="mb-3">
        <h1 className="text-[32px] capitalize font-bold">
          {isPending ? <Skeleton className="h-8 w-1/2" /> : displayTitle}
        </h1>
        <p className="text-sm text-gray-500 font-medium -mt-1"></p>
      </div>
      {isPending ? (
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-4 w-14" />
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge
            variant="outline"
            className="border-primary capitalize gap-1.5 !font-medium py-1"
          >
            <FuelIcon className="size-3.5" />
            {fuelType?.toLowerCase()}
          </Badge>
          <Badge
            variant="outline"
            className="border-primary gap-1.5 !font-medium py-1"
          >
            <GaugeIcon className="size-3.5" />
            {mileage} km/h
          </Badge>
          <Badge
            variant="outline"
            className="border-primary capitalize gap-1.5 !font-medium py-1"
          >
            <TagIcon className="size-3.5" />
            {condition?.toLowerCase()}
          </Badge>
          <Badge
            variant="outline"
            className="border-primary capitalize gap-1.5 !font-medium py-1 "
          >
            <CogIcon className="size-3.5" />
            {transmission?.toLowerCase()}
          </Badge>
        </div>
      )}
    </div>
  );
};

export default CarHeader;
