import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CogIcon, FuelIcon, GaugeIcon, TagIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { createSlug, formatCurrency } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { ListingType } from "@/@types/api.type";
import { CAR_CONDITION_OPTIONS } from "@/constants/car-options";

interface CarCardProps {
  listing: ListingType;
  layout?: "grid" | "list";
}

const CarCard: React.FC<CarCardProps> = ({ listing, layout = "grid" }) => {
  const {
    $id,
    imageUrls,
    displayTitle,
    price,
    fuelType,
    condition,
    transmission,
    mileage,
    description,
  } = listing;
  const slug = createSlug(displayTitle);
  const conditionLabel = CAR_CONDITION_OPTIONS.find(
    (opt) => opt.value === condition
  )?.label;

  return (
    <div>
      <Link href={`/detail/${slug}/${$id}`}>
        <Card
          className={cn(
            `border rounded-lg shadow-sm p-0 flex flex-col gap-4`,
            layout === "list" && "flex-col md:flex-row border-primary/30"
          )}
        >
          <div
            className={cn(
              `relative w-full min-h-28 !h-[210px] 
              bg-primary/10 overflow-hidden`,
              layout === "list" &&
                `w-full 
              md:w-[220px] !h-[210px] shrink-0`
            )}
          >
            <Image
              aria-hidden
              src={imageUrls[0]}
              className={cn(
                "rounded-t-lg w-full h-full object-cover",
                layout === "list" && "md:!rounded-r-none"
              )}
              width={layout === "list" ? 300 : 800}
              height={layout === "list" ? 200 : 500}
              priority
              alt=""
            />
          </div>
          <CardContent
            className={cn(
              `!p-4 !pt-0 space-y-3`,
              layout === "list" &&
                "flex-1 !p-[18px_16px_18px_16px] md:!p-[18px_16px_18px_0px]"
            )}
          >
            <div className="flex flex-col gap-0">
              <h3
                className={cn(
                  `font-bold text-base text-gray-800 capitalize truncate max-w-full`,
                  layout === "list" && "text-lg w-auto"
                )}
              >
                {displayTitle}
              </h3>
              <div
                className={cn(
                  `h-auto mt-1 text-sm text-gray-500 line-clamp-2 text-ellipsis`,
                  layout === "list" && "w-auto h-auto whitespace-break-spaces"
                )}
              >
                {description}
              </div>
            </div>
            <div className="flex items-center justify-between !mt-2 my-1">
              <p className="font-bold text-xl text-primary">
                {formatCurrency(price)}
              </p>
            </div>
            <div
              className={cn(
                `flex flex-wrap items-center gap-2`,
                layout === "list" && "mt-1"
              )}
            >
              <Badge
                variant="outline"
                className="border-primary gap-1.5 text-[11px] capitalize !font-medium 
                py-[3px] px-2"
              >
                <FuelIcon className="size-3" />
                {fuelType?.toLowerCase()}
              </Badge>
              <Badge
                variant="outline"
                className="border-primary text-[11px] gap-1.5 !font-medium py-[3px] px-2"
              >
                <GaugeIcon className="size-3" />
                {mileage} mpg
              </Badge>
              <Badge
                variant="outline"
                className="border-primary text-[11px] capitalize
                gap-1.5 !font-medium py-[3px] px-2"
              >
                <TagIcon className="size-3" />
                {conditionLabel}
              </Badge>
              <Badge
                variant="outline"
                className="border-primary text-[11px] gap-1.5 capitalize !font-medium 
                py-[3px] px-2
                "
              >
                <CogIcon className="size-3" />
                {transmission?.toLowerCase()}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default CarCard;

// const CarCard: React.FC<CarCardProps> = ({
//   id,
//   image,
//   name,
//   type,
//   price,
//   fuelType = "Petrol",
//   speed = 180,
//   condition = "New",
//   transmission = "Automatic",
// }) => {
//   const slug = createSlug(name);
//   return (
//     <div>
//       <Link href={`/detail/${slug}/${id}`}>
//         <Card className="border rounded-lg shadow-sm p-0 flex flex-col gap-4">
//           <div className="relative min-h-28">
//             <Image
//               aria-hidden
//               src={image}
//               className="rounded-lg w-full h-full object-cover"
//               width={800}
//               height={500}
//               priority
//               alt=""
//             />
//           </div>
//           <CardContent className="!p-4 !pt-0 space-y-3">
//             <div className="flex flex-col gap-0 ">
//               <h3 className="font-bold text-base text-gray-800">{name}</h3>
//               <p className="text-xs text-gray-500">{type}</p>
//             </div>
//             <div className="flex items-center justify-between !mt-2 my-1">
//               <p className="font-bold text-xl text-primary">{price}</p>
//             </div>
//             <div className="flex flex-wrap items-center gap-2">
//               <Badge
//                 variant="outline"
//                 className="border-primary gap-1.5 !font-medium py-1"
//               >
//                 <FuelIcon className="size-3.5" />
//                 {fuelType}
//               </Badge>
//               <Badge
//                 variant="outline"
//                 className="border-primary gap-1.5 !font-medium py-1"
//               >
//                 <GaugeIcon className="size-3.5" />
//                 {speed} km/h
//               </Badge>
//               <Badge
//                 variant="outline"
//                 className="border-primary gap-1.5 !font-medium py-1"
//               >
//                 <TagIcon className="size-3.5" />
//                 {condition}
//               </Badge>
//               <Badge
//                 variant="outline"
//                 className="border-primary gap-1.5 !font-medium py-1 "
//               >
//                 <CogIcon className="size-3.5" />
//                 {transmission}
//               </Badge>
//             </div>
//           </CardContent>
//         </Card>
//       </Link>
//     </div>
//   );
// };

// export default CarCard;
