import { Button } from "@/components/ui/button";
import { PhoneIcon } from "lucide-react";
import React from "react";

const CTASection = () => {
  return (
    <div className="w-full bg-primary min-h-[400px]">
      <div className="w-full max-w-7xl mx-auto py-20 flex items-center justify-between">
        <div className="flex flex-col gap-4">
          <h2 className="text-5xl font-bold text-white !leading-[50px]">
            Get your best car <br /> at the best price
          </h2>
          <p className="text-white max-w-xl">
            We offer a wide range of cars to choose from, ensuring you find the
            perfect vehicle for your needs.
          </p>

          <Button
            size="lg"
            className="uppercase max-w-xs !mt-6 bg-[#1b1b1b] font-semibold !py-4 px-10 rounded-lg !h-auto"
          >
            <PhoneIcon className="w-5 h-5" />
            Speak to our expert
          </Button>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
};

export default CTASection;
