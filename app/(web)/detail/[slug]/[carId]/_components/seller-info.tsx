import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquareText, User } from "lucide-react";
import Link from "next/link";
import React from "react";

const SellerInfo = () => {
  return (
    <div className="w-full b-seller-info-wrapper">
      {/* {Price } */}
      <Card className="w-full bg-white rounded-lg  shadow-custom">
        <CardContent className="!p-4">
          <h2 className="font-semibold text-xs text-gray-500 uppercase mb-2">
            Price
          </h2>
          <div className="" itemProp="price" content="45500000">
            <p className="text-2xl">$ 105,500</p>
          </div>
        </CardContent>
      </Card>

      {/* {Shop Details } */}
      <Card className="w-full bg-white rounded-lg shadow-custom mt-4">
        <CardContent className="!p-4">
          <Link href="/shop/eofjgjg" className="flex items-center gap-2">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-primary/40">
                <User className="w-8 h-8 text-white" />
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col space-y-[3px]">
              <h5 className="hover:underline -mt-0 text-base font-medium">
                PrymeAce Global Ltd
              </h5>
              <p
                className="flex items-center m-[0_6px_1px_0px] text-[10px]
            text-[#6c8ea0]"
              >
                Typically replies within a few hours
              </p>
              <p
                className="flex items-center m-[0_6px_6px_0px] text-[10px]
            text-[#6c8ea0]"
              >
                1 y 9 m on Autohunt
              </p>
            </div>
          </Link>

          {/* {Chat Button } */}
          <div className="mt-4">
            <Button
              variant="outline"
              size="lg"
              className="w-full border-primary text-primary
             !gap-1 h-10 text-[15px] font-medium hover:bg-primary hover:text-white"
            >
              <MessageSquareText className="!w-5 !h-5" />
              Start chat
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* {Safety Tips } */}
      <Card className="w-full bg-white rounded-lg shadow-custom mt-4">
        <CardContent className="!p-4">
          <h2 className="font-bold text-lg text-center mb-2">Safety tips</h2>
          <ul
            role="list"
            className="safety-list text-sm space-y-1 font-normal
         px-4 text-gray-700
        "
          >
            <li role="listitem">Avoid sending any prepayments</li>
            <li role="listitem">Meet with the seller at a safe public place</li>
            <li role="listitem">
              Inspect what you're going to buy to make sure it's what you need
            </li>
            <li role="listitem">
              Check all the docs and only pay if you're satisfied
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerInfo;
