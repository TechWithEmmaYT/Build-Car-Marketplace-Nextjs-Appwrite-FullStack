export type CategoryType = {
  id: string;
  name: string;
  slug: string;
};

type FuelType = "Petrol" | "Diesel" | "Electric" | "Hybrid";
type Condition = "New" | "Used";
type Transmission = "Automatic" | "Manual";

export interface CarType {
  id: string;
  image: string;
  name: string;
  type: string;
  price: string;
  fuelType: FuelType;
  speed: number;
  condition: Condition;
  transmission: Transmission;
}

export type FieldType = {
  name: string;
  fieldType: "text" | "number" | "select" | "textarea" | "multiselect";
  label: string;
  value: string | string[];
  placeholder?: string;
  col?: number;
  options?: { value: string; label: string }[];
  required?: boolean;
  disabled?: boolean;
};
