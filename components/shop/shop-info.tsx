import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { MessageCircleMore, MessageSquareText } from "lucide-react";

const ShopInfo = ({ isShopOwner = false }: { isShopOwner?: boolean }) => {
  return (
    <div className="w-full">
      {/* {Seller detail} */}
      <Card className="shadow-custom rounded-[8px] mb-3 border-none">
        <CardContent className="p-3">
          <div className="flex items-center justify-center">
            <Avatar className="h-28 w-28 border-2 p-[1px] border-[#ebf2f7] ">
              <AvatarFallback className="bg-primary/40 font-semibold text-3xl text-white">
                SC
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="mt-3 ">
            {isShopOwner ? (
              <>
                <h5 className="font-bold text-base">Emmanuel Umeh</h5>
                <p className="text-sm text-gray-500">PrymeAce Global Ltd</p>
              </>
            ) : (
              <h5 className="font-bold text-base">PrymeAce Global Ltd</h5>
            )}
          </div>
          <div className="mt-1">
            <span
              className="text-[10px] inline-block py-[2px] px-2
                   text-gray-500 bg-gray-100 rounded-sm font-extralight"
            >
              last seen 10 hours ago
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="!bg-transparent shadow-none border-none">
        {/* {Contact Seller} */}
        {!isShopOwner && (
          <div className="p-3 bg-white rounded-[8px] mb-3 flex flex-col gap-2">
            <Button
              variant="default"
              size="lg"
              className="w-full
             !gap-1 h-10 text-[15px] font-medium"
            >
              <MessageSquareText className="!w-5 !h-5" />
              Start chat
            </Button>
          </div>
        )}

        <div className="p-3 bg-white rounded-[8px]">
          <h5 className="font-medium text-sm uppercase mb-2 text-[#6c8ea0]">
            About {isShopOwner ? "You" : "Shop"}
          </h5>
          <p className="text-sm text-black font-light">
            PrymeAce Global Ltd is a company that sells cars and other vehicles.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ShopInfo;
