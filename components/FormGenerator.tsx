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

type FormGeneratorProps = {
  field: FieldType;
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues>;
  formValue?: any;
  onChange?: (value: any) => void;
  defaultValue?: any;
  onChangeMultiSelect?: (value: { value: string; label: string }[]) => void;
  valueMultiSelect?: { value: string; label: string }[];
};

const FormGenerator: React.FC<FormGeneratorProps> = ({
  field,
  register,
  formValue,
  onChange,
  defaultValue,
  onChangeMultiSelect,
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
          onValueChange={(value) => onChange?.(value)} // Trigger form's onChange
          disabled={disabled}
        >
          <SelectTrigger className="w-full !h-12 shadow-none">
            <SelectValue
              className="placeholder:text-muted-foreground"
              placeholder={placeholder || `Select ${label}`}
            />
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
          onChange={onChangeMultiSelect}
          disabled={disabled}
          value={valueMultiSelect || []}
          badgeClassName="!bg-primary/10 shadow-none text-black !font-medium"
          className="w-full !min-h-12 max-h-12 truncate shadow-none"
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
