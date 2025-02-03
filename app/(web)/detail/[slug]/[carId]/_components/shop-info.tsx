import Link from "next/link";
import React from "react";
import { User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/helper";
import { Skeleton } from "@/components/ui/skeleton";
import ChatSellerButton from "@/components/ChatSellerButton";

interface ShopInfoProps {
  displayTitle: string;
  price: number;
  shopId: string;
  shopName: string;
  shopOwnerUserId: string;
  description: string;
  isPending: boolean;
}

const ShopInfo = ({
  displayTitle,
  price,
  shopId,
  shopName,
  description,
  isPending,
  shopOwnerUserId,
}: ShopInfoProps) => {
  return (
    <div className="w-full b-seller-info-wrapper">
      {isPending ? (
        <div className="w-full">
          <Skeleton className="w-full h-[88px] rounded-lg mb-4" />
          <Skeleton className="w-full h-[136px] rounded-lg mb-4" />
          <Skeleton className="w-full h-[200px] rounded-lg mb-4" />
        </div>
      ) : (
        <>
          {/* {Price } */}
          <Card className="w-full bg-white rounded-lg  shadow-custom">
            <CardContent className="!p-4">
              <h2 className="font-semibold text-xs text-gray-500 uppercase mb-2">
                Price
              </h2>
              <div>
                <p className="text-2xl">{formatCurrency(price)}</p>
              </div>
            </CardContent>
          </Card>

          {/* {Shop Details } */}
          <Card className="w-full bg-white rounded-lg shadow-custom mt-4">
            <CardContent className="!p-4">
              <Link
                href={`/shop/${shopId}`}
                className="flex items-center gap-2"
              >
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-primary/40">
                    <User className="w-8 h-8 text-white" />
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col space-y-[3px]">
                  <h5 className="hover:underline -mt-0 text-base font-medium">
                    {shopName}
                  </h5>
                  <p
                    className="flex items-center m-[0_6px_1px_0px] text-[10px]
            text-[#6c8ea0]"
                  >
                    {description}
                  </p>
                  <p
                    className="flex items-center m-[0_6px_6px_0px] text-[10px]
            text-[#6c8ea0]"
                  >
                    Typically replies within a few hours
                  </p>
                </div>
              </Link>

              {/* {Chat Button } */}
              <div className="mt-4">
                <ChatSellerButton
                  displayTitle={displayTitle}
                  shopName={shopName}
                  shopOwnerUserId={shopOwnerUserId}
                />
              </div>
            </CardContent>
          </Card>

          {/* {Safety Tips } */}
          <Card className="w-full bg-white rounded-lg shadow-custom mt-4">
            <CardContent className="!p-4">
              <h2 className="font-bold text-lg text-center mb-2">
                Safety tips
              </h2>
              <ul
                role="list"
                className="safety-list text-sm space-y-1 font-normal
         px-4 text-gray-700
        "
              >
                <li role="listitem">Avoid sending any prepayments</li>
                <li role="listitem">
                  Meet with the seller at a safe public place
                </li>
                <li role="listitem">
                  Inspect what you're going to buy to make sure it's what you
                  need
                </li>
                <li role="listitem">
                  Check all the docs and only pay if you're satisfied
                </li>
              </ul>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default ShopInfo;
