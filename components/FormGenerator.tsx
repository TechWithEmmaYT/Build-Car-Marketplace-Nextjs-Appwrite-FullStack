"use client";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "./ui/textarea";
import MultipleSelector from "./ui/multi-select";
import { FieldType } from "@/@types/index.type";
import { PhoneInput } from "./ui/phone-input";

type FormGeneratorProps = {
  field: FieldType;
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues>;
  formValue?: any;
  onChange?: (value: any) => void;
  defaultValue?: any;
  valueMultiSelect?: { value: string; label: string }[];
};

const FormGenerator: React.FC<FormGeneratorProps> = ({
  field,
  register,
  formValue,
  onChange,
  defaultValue,
  valueMultiSelect,
}) => {
  const { name, fieldType, label, disabled, placeholder, options } = field;

  return (
    <div className="grid gap-2">
      {!label && <Label htmlFor={name}>{label}</Label>}
      {fieldType === "text" && (
        <Input
          id={name}
          type="text"
          className="!h-12 shadow-none"
          disabled={disabled}
          placeholder={placeholder || label}
          defaultValue={defaultValue}
          {...register(name)}
        />
      )}
      {fieldType === "number" && (
        <Input
          id={name}
          type="number"
          className="!h-12 shadow-none placeholder:!text-muted-foreground"
          disabled={disabled}
          placeholder={placeholder || label}
          defaultValue={defaultValue}
          {...register(name)}
        />
      )}
      {fieldType === "phone" && (
        <PhoneInput
          id={name}
          className="phone--input !h-12"
          autoComplete="off"
          disabled={disabled}
          placeholder={placeholder || label}
          defaultValue={defaultValue}
          onChange={(value) => {
            onChange?.(value);
          }}
        />
      )}
      {fieldType === "currency" && (
        <div className="relative">
          <span
            className="absolute inset-y-0 left-0 flex 
          items-center pl-3 text-sm
           text-gray-500 dark:text-gray-400"
          >
            $
          </span>
          <Input
            id={name}
            type="text"
            className="!h-12 shadow-none placeholder:!text-muted-foreground pl-9"
            placeholder={placeholder || label}
            defaultValue={defaultValue}
            {...register(name, {
              onChange: (e) => {
                const rawValue = e.target.value.replace(/\D/g, "");
                const formattedValue = rawValue
                  ? new Intl.NumberFormat().format(Number(rawValue))
                  : "";
                e.target.value = formattedValue;
              },
              setValueAs: (value) => value?.replace(/\D/g, ""),
            })}
          />
        </div>
      )}
      {fieldType === "textarea" && (
        <Textarea
          id={name}
          placeholder={placeholder || label}
          className=""
          disabled={disabled}
          rows={4}
          defaultValue={defaultValue}
          {...register(name)}
        />
      )}
      {fieldType === "select" && options && (
        <Select
          value={formValue || ""}
          onValueChange={(value) => onChange?.(value)}
          disabled={disabled || options?.length === 0}
        >
          <SelectTrigger
            className="w-full !h-12 shadow-none
          data-[placeholder]:text-muted-foreground
          "
          >
            <SelectValue placeholder={placeholder || `Select ${label}`} />
          </SelectTrigger>
          <SelectContent>
            {options.length === 0 && (
              <p className="text-center text-sm text-muted-foreground leading-10">
                No options found.
              </p>
            )}
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {fieldType === "multiselect" && options && (
        <MultipleSelector
          options={options}
          placeholder={`Select ${label}`}
          disabled={disabled}
          badgeClassName="!bg-primary/10 shadow-none text-black !font-medium"
          className="w-full !min-h-12 max-h-auto shadow-none"
          value={valueMultiSelect || []}
          onChange={(selectedItems) => {
            onChange?.(selectedItems);
          }}
          emptyIndicator={
            <p className="text-center text-sm text-muted-foreground leading-10">
              No options found.
            </p>
          }
        />
      )}
    </div>
  );
};

export default FormGenerator;
