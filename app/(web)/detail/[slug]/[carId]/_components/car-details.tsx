import { ListingType } from "@/@types/api.type";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { CAR_BRAND_OPTIONS, CAR_KEY_FEATURES_OPTIONS } from "@/constants/cars";
import {
  CheckSquare,
  CogIcon,
  FuelIcon,
  GaugeIcon,
  MessageSquareText,
  TagIcon,
} from "lucide-react";
import React from "react";

const CarDetails = ({
  listing,
  isPending,
}: {
  listing: ListingType;
  isPending: boolean;
}) => {
  const getSelectedItems = (
    values: string[] = [],
    options: { label: string; value: string }[]
  ) => {
    return options?.filter((option) => values?.includes(option.value));
  };

  const brand = getSelectedItems([listing?.brand || ""], CAR_BRAND_OPTIONS)?.[0]
    ?.label;
  return (
    <div className="w-full h-auto pt-2">
      <Card className="!rounded-t-none rounded-b-[8px] shadow-custom">
        <CardContent className="!p-4 !py-6">
          {/* {Descritpion} */}
          <div className="mb-4">
            <h2 className="font-bold text-lg mb-2">Description</h2>
            <div className="text-sm font-light">
              {isPending ? (
                <Skeleton className="h-4 w-2/3" />
              ) : (
                listing?.description
              )}
            </div>
            <ul className="my-4 flex items-center font-light gap-5">
              <li className="flex flex-col capitalize items-center text-sm gap-2">
                {isPending ? (
                  <>
                    <Skeleton className="w-[47px] h-[47px] rounded-full" />
                    <Skeleton className="h-3 w-10" />
                  </>
                ) : (
                  <>
                    <span className="border-2 rounded-full p-3">
                      <FuelIcon className="size-5" />
                    </span>
                    {listing?.fuelType?.toLowerCase()}
                  </>
                )}
              </li>
              <li className="flex flex-col capitalize items-center text-sm gap-2">
                {isPending ? (
                  <>
                    <Skeleton className="w-[47px] h-[47px] rounded-full" />
                    <Skeleton className="h-3 w-10" />
                  </>
                ) : (
                  <>
                    <span className="border-2 rounded-full p-3">
                      <GaugeIcon className="size-5" />
                    </span>
                    {listing?.mileage}
                  </>
                )}
              </li>
              <li className="flex flex-col items-center text-sm gap-2">
                {isPending ? (
                  <>
                    <Skeleton className="w-[47px] h-[47px] rounded-full" />
                    <Skeleton className="h-3 w-10" />
                  </>
                ) : (
                  <>
                    <span className="border-2 rounded-full p-3">
                      <CogIcon className="size-5" />
                    </span>
                    {listing?.transmission?.toLowerCase()}
                  </>
                )}
              </li>
              <li className="flex flex-col capitalize items-center text-sm gap-2">
                {isPending ? (
                  <>
                    <Skeleton className="w-[47px] h-[47px] rounded-full" />
                    <Skeleton className="h-3 w-10" />
                  </>
                ) : (
                  <>
                    <span className="border-2 rounded-full p-3">
                      <TagIcon className="size-5" />
                    </span>
                    {listing?.condition?.toLowerCase()}
                  </>
                )}
              </li>
            </ul>
          </div>

          <Separator />
          <div className="my-4">
            <ul className="grid grid-cols-2 gap-5">
              <li>
                <h5
                  className="uppercase text-xs
                 text-muted-foreground mb-[1px]"
                >
                  Brand
                </h5>
                <p className="text-sm">{brand}</p>
              </li>
              <li>
                <h5
                  className="uppercase text-xs
                 text-muted-foreground mb-[1px]"
                >
                  Model
                </h5>
                <p className="text-sm">{listing?.model}</p>
              </li>
              <li>
                <h5
                  className="uppercase text-xs
                 text-muted-foreground mb-[1px]"
                >
                  Year of Manufacture
                </h5>
                <p className="text-sm">{listing?.yearOfManufacture}</p>
              </li>
              <li>
                <h5
                  className="uppercase text-xs
                 text-muted-foreground mb-[1px]"
                >
                  Exterior Color
                </h5>
                <p className="text-sm">{listing?.exteriorColor}</p>
              </li>
              <li>
                <h5
                  className="uppercase text-xs
                 text-muted-foreground mb-[1px]"
                >
                  Interior Color
                </h5>
                <p className="text-sm">{listing?.interiorColor}</p>
              </li>
              <li>
                <h5
                  className="uppercase text-xs
                 text-muted-foreground mb-[1px]"
                >
                  Body Type
                </h5>
                <p className="text-sm">{listing?.bodyType}</p>
              </li>
              <li>
                <h5
                  className="uppercase text-xs
                 text-muted-foreground mb-[1px]"
                >
                  Drive Train
                </h5>
                <p className="text-sm">{listing?.drivetrain}</p>
              </li>
              <li>
                <h5
                  className="uppercase text-xs
                 text-muted-foreground mb-[1px]"
                >
                  Seating Capacity
                </h5>
                <p className="text-sm">{listing?.seatingCapacity}</p>
              </li>
              <li>
                <h5
                  className="uppercase text-xs
                 text-muted-foreground mb-[1px]"
                >
                  Second Condition
                </h5>
                <p className="text-sm">{listing?.secondCondition}</p>
              </li>
            </ul>
          </div>
          <Separator />
          <div className="my-4">
            <h2 className="font-bold text-lg mb-3">Features</h2>
            <div>
              <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {getSelectedItems(
                  listing?.keyFeatures || [],
                  CAR_KEY_FEATURES_OPTIONS
                )?.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm gap-2">
                    <CheckSquare className={`w-4 h-4 text-primary/80`} />
                    {feature.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Separator />
          <div className="my-4">
            <Button size="lg" className="text-[15px] font-medium px-">
              <MessageSquareText className="!w-5 !h-5" />
              Chat seller
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarDetails;
