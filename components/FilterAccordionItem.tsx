"use client";

import React from "react";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dot } from "lucide-react";

interface FilterAccordionItemProps {
  title: string;
  value: string;
  filterType: "checkbox" | "radio" | "range" | "custom";
  options?: any[]; // Define more specific type if possible
  selectedValues?: string[] | string | undefined;
  onValuesChange?: (values: string[] | string | undefined) => void;
  hasSearch?: boolean;
  hasClearButton?: boolean;
  minMaxInput?: boolean;
  children?: React.ReactNode;
}

const FilterAccordionItemComponent: React.FC<FilterAccordionItemProps> = ({
  title,
  value,
  filterType,
  options = [],
  selectedValues,
  onValuesChange,
  hasSearch = false,
  hasClearButton = false,
  minMaxInput = false,
  children,
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredOptions, setFilteredOptions] = React.useState(options);
  const [minValue, setMinValue] = React.useState<string>("");
  const [maxValue, setMaxValue] = React.useState<string>("");

  React.useEffect(() => {
    if (hasSearch && options) {
      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [searchTerm, hasSearch]);

  const handleClear = () => {
    if (onValuesChange) {
      onValuesChange(undefined);
    }
  };

  return (
    <AccordionItem
      className="w-full mb-3 rounded-[4px] min-h-14 bg-white px-4 border-0"
      value={value}
    >
      <AccordionTrigger className="!no-underline text-sm font-semibold flex justify-between items-center">
        {title}
      </AccordionTrigger>
      <AccordionContent className="!pt-0">
        {hasSearch && (
          <div className="mb-2">
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-sm focus:!ring-0 focus:!shadow-none border"
            />
          </div>
        )}
        {minMaxInput && (
          <div className="flex space-x-2 mb-2">
            <Input
              type="number"
              placeholder="Min"
              value={minValue}
              onChange={(e) => setMinValue(e.target.value)}
              className="w-1/2 text-sm focus:!ring-0 focus:!shadow-none border"
            />
            <Input
              type="number"
              placeholder="Max"
              value={maxValue}
              onChange={(e) => setMaxValue(e.target.value)}
              className="w-1/2 text-sm focus:!ring-0 focus:!shadow-none border"
            />
          </div>
        )}
        {filterType === "checkbox" && (
          <ScrollArea
            className="max-h-[190px] mb-2
          flex flex-col overflow-y-auto
          "
          >
            <div className="space-y-2">
              {filteredOptions.map((option) => (
                <label key={option.value} className="flex items-center">
                  <Checkbox
                    className="mr-2"
                    checked={selectedValues?.includes(option.value)}
                    onCheckedChange={(checked) => {
                      if (onValuesChange) {
                        const currentValues = Array.isArray(selectedValues)
                          ? [...selectedValues]
                          : [];
                        if (checked) {
                          onValuesChange([...currentValues, option.value]);
                        } else {
                          onValuesChange(
                            currentValues.filter((val) => val !== option.value)
                          );
                        }
                      }
                    }}
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        )}
        {filterType === "radio" && (
          <RadioGroup
            defaultValue={selectedValues as string}
            onValueChange={(val) => onValuesChange && onValuesChange(val)}
          >
            <div className="space-y-2 mb-2">
              {filteredOptions.map((option) => (
                <div key={option.label} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option.label}
                    id={`radio-item-${option.value}`}
                  />
                  <label
                    htmlFor={`radio-item-${option.value}`}
                    className="!text-sm font-normal flex items-center gap-[1px]"
                  >
                    {option.label}
                    {option.adsCount && (
                      <span className="flex items-center gap-[1px] text-[#6c8ea0] ">
                        <Dot className="w-4 h-4" /> {option.adsCount} ads
                      </span>
                    )}
                  </label>
                </div>
              ))}
            </div>
          </RadioGroup>
        )}
        {filterType === "range" && children}{" "}
        {/* Render children for range or custom */}
        {filterType === "custom" && children}
        {hasClearButton && selectedValues && (
          <div className="mt-2">
            <Button
              variant="ghost"
              onClick={handleClear}
              className="!text-muted-foreground 
              !bg-transparent !font-medium
              !text-[13px] uppercase !p-0 !w-auto !h-auto"
            >
              Clear
            </Button>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

const FilterAccordionItem = React.memo(FilterAccordionItemComponent);
export default FilterAccordionItem;
