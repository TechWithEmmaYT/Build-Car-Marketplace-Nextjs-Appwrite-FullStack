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
import { cn } from "@/lib/utils";

interface FilterAccordionItemProps {
  title: string;
  value: string;
  filterType: "checkbox" | "radio" | "range" | "custom";
  diasbled?: boolean;
  options?: any[]; // Define more specific type if possible
  selectedValues?: string[] | string | undefined;
  onValuesChange?: (values: string[] | string | undefined) => void;
  hasSearch?: boolean;
  hasClearButton?: boolean;
  minMaxInput?: boolean;
  children?: React.ReactNode;
  renderCustom?: JSX.Element;
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
  diasbled = false,
  children,
  renderCustom,
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredOptions, setFilteredOptions] = React.useState(options);
  const [isCustomSelected, setIsCustomSelected] = React.useState(false);

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

  const handleRadioChange = (value: string) => {
    if (value === "custom") {
      setIsCustomSelected(true);
    } else {
      setIsCustomSelected(false);
      onValuesChange?.(value);
    }
  };

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
              disabled={diasbled}
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-sm focus:!ring-0 focus:!shadow-none border"
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
                <label
                  key={option.value}
                  className={cn(
                    `flex items-center !cursor-pointer`,
                    diasbled &&
                      "pointer-events-none text-muted-foreground opacity-75"
                  )}
                >
                  <Checkbox
                    className="mr-2"
                    disabled={diasbled}
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
            className={cn(
              "",
              diasbled && "pointer-events-none text-muted-foreground opacity-75"
            )}
            disabled={diasbled}
            defaultValue={selectedValues as string}
            onValueChange={handleRadioChange}
          >
            <div className="space-y-2 mb-2">
              {filteredOptions.map((option) => {
                return (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`radio-item-${option.value}`}
                      checked={
                        option.value ===
                        (isCustomSelected ? "custom" : selectedValues)
                      }
                    />
                    <label
                      htmlFor={`radio-item-${option.value}`}
                      className="!text-sm font-normal !cursor-pointer flex items-center gap-[1px]"
                    >
                      {option.label}
                      {/* {option.adsCount && (
                      <span className="flex items-center gap-[1px] text-[#6c8ea0] ">
                        <Dot className="w-4 h-4" /> {option.adsCount} ads
                      </span>
                    )} */}
                    </label>
                  </div>
                );
              })}
              {/* Render custom content if "Custom" is selected */}
              {isCustomSelected && renderCustom}
            </div>
          </RadioGroup>
        )}

        {/* Render children for range or custom */}
        {filterType === "custom" && children}

        {hasClearButton && (
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
