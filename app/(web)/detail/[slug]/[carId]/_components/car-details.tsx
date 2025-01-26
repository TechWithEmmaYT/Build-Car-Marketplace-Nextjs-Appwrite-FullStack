import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { carFeatures } from "@/constants/cars";
import {
  CheckSquare,
  CogIcon,
  FuelIcon,
  GaugeIcon,
  MessageSquareText,
  Radio,
  TagIcon,
  X,
} from "lucide-react";
import React from "react";

const CarDetails = () => {
  return (
    <div className="w-full h-auto pt-2">
      <Card className="!rounded-t-none rounded-b-[8px] shadow-custom">
        <CardContent className="!p-4 !py-6">
          {/* {Descritpion} */}
          <div className="mb-4">
            <h2 className="font-bold text-lg mb-2">Description</h2>
            <div>
              <p className="text-sm font-light">
                This car is a stunning example of automotive excellence,
                blending luxury, performance, and style in one remarkable
                package. With its sleek lines and powerful engine, it's sure to
                turn heads wherever you go. This vehicle has been meticulously
                maintained and is in excellent condition, ready for its next
                owner to enjoy.
              </p>
            </div>
            <ul className="my-4 flex items-center font-light gap-5">
              <li className="flex flex-col items-center text-sm gap-2">
                <span className="border-2 rounded-full p-3">
                  <FuelIcon className="size-5" />
                </span>
                Petrol
              </li>
              <li className="flex flex-col items-center text-sm gap-2">
                <span className="border-2 rounded-full p-3">
                  <GaugeIcon className="size-5" />
                </span>
                Speed
              </li>
              <li className="flex flex-col items-center text-sm gap-2">
                <span className="border-2 rounded-full p-3">
                  <CogIcon className="size-5" />
                </span>
                Automatic
              </li>
              <li className="flex flex-col items-center text-sm gap-2">
                <span className="border-2 rounded-full p-3">
                  <TagIcon className="size-5" />
                </span>
                New
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
                <p className="text-sm">Mercedes-Benz</p>
              </li>
              <li>
                <h5
                  className="uppercase text-xs
                 text-muted-foreground mb-[1px]"
                >
                  Model
                </h5>
                <p className="text-sm">S-Class</p>
              </li>
              <li>
                <h5
                  className="uppercase text-xs
                 text-muted-foreground mb-[1px]"
                >
                  Conditon
                </h5>
                <p className="text-sm">No fault</p>
              </li>
              <li>
                <h5
                  className="uppercase text-xs
                 text-muted-foreground mb-[1px]"
                >
                  Year of Manufacture
                </h5>
                <p className="text-sm">2014</p>
              </li>
              <li>
                <h5
                  className="uppercase text-xs
                 text-muted-foreground mb-[1px]"
                >
                  Color
                </h5>
                <p className="text-sm">Black</p>
              </li>
            </ul>
          </div>
          <Separator />
          <div className="my-4">
            <h2 className="font-bold text-lg mb-3">Features</h2>
            <div>
              <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.entries(carFeatures).map(([feature, value]) => (
                  <li key={feature} className="flex items-center text-sm gap-2">
                    {value ? (
                      <CheckSquare className={`w-4 h-4 text-primary/80`} />
                    ) : (
                      <X className="w-4 h-4 text-muted-foreground" />
                    )}
                    {feature}
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
