import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CogIcon, FuelIcon, GaugeIcon, TagIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { createSlug } from "@/lib/helper";
import { cn } from "@/lib/utils";

interface CarCardProps {
  id: string;
  image: string;
  name: string;
  type: string;
  price: string;
  fuelType: "Petrol" | "Diesel" | "Electric" | "Hybrid";
  speed: number;
  condition: "New" | "Used";
  transmission: "Automatic" | "Manual";
  layout?: "grid" | "list";
}

const CarCard: React.FC<CarCardProps> = ({
  id,
  image,
  name,
  type,
  price,
  fuelType = "Petrol",
  speed = 180,
  condition = "New",
  transmission = "Automatic",
  layout = "grid",
}) => {
  const slug = createSlug(name);

  return (
    <div>
      <Link href={`/detail/${slug}/${id}`}>
        <Card
          className={cn(
            `border rounded-lg shadow-sm p-0 flex flex-col gap-4
            `,
            layout === "list" && "flex-row md:flex-row  border-primary/30"
          )}
        >
          <div
            className={cn(
              `relative min-h-28`,
              layout === "list" && "max-w-[185px] md:max-w-[250px]"
            )}
          >
            <Image
              aria-hidden
              src={image}
              className={cn(
                "rounded-lg w-full h-full object-cover",
                layout === "list" && "h-full"
              )}
              width={layout === "list" ? 300 : 800}
              height={layout === "list" ? 200 : 500}
              priority
              alt=""
            />
          </div>
          <CardContent
            className={cn(
              `
            !p-4 !pt-0 space-y-3`,
              layout === "list" && "flex-1 !p-[18px_16px_18px_0px]"
            )}
          >
            <div className="flex flex-col gap-0 ">
              <h3
                className={cn(
                  `font-bold text-base text-gray-800`,
                  layout === "list" && "text-lg"
                )}
              >
                {name}
              </h3>
              <p className="text-xs text-gray-500">{type}</p>
            </div>
            <div className="flex items-center justify-between !mt-2 my-1">
              <p className="font-bold text-xl text-primary">{price}</p>
            </div>
            <div
              className={cn(
                `flex flex-wrap items-center gap-2`,
                layout === "list" && "mt-1"
              )}
            >
              <Badge
                variant="outline"
                className="border-primary gap-1.5 !font-medium py-1"
              >
                <FuelIcon className="size-3.5" />
                {fuelType}
              </Badge>
              <Badge
                variant="outline"
                className="border-primary gap-1.5 !font-medium py-1"
              >
                <GaugeIcon className="size-3.5" />
                {speed} km/h
              </Badge>
              <Badge
                variant="outline"
                className="border-primary gap-1.5 !font-medium py-1"
              >
                <TagIcon className="size-3.5" />
                {condition}
              </Badge>
              <Badge
                variant="outline"
                className="border-primary gap-1.5 !font-medium py-1 "
              >
                <CogIcon className="size-3.5" />
                {transmission}
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
