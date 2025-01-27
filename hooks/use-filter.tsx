"use client";
import {
  useQueryState,
  parseAsArrayOf,
  parseAsString,
  parseAsInteger,
} from "nuqs";

type FilterKeys =
  | "brand"
  | "model"
  | "fuelType"
  | "year_min"
  | "year_max"
  | "price"
  | "carType"
  | "condition"
  | "color";

const useFilters = () => {
  // Initialize query states for all filters
  const [brand, setBrand] = useQueryState(
    "brand",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [model, setModel] = useQueryState(
    "model",
    parseAsArrayOf(parseAsString).withDefault([])
  ); // Array of strings
  const [fuelType, setFuelType] = useQueryState(
    "fuelType",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [yearMin, setYearMin] = useQueryState(
    "year_min",
    parseAsInteger.withDefault(0)
  ); // Single integer
  const [yearMax, setYearMax] = useQueryState(
    "year_max",
    parseAsInteger.withDefault(0)
  ); // Single integer

  const [price, setPrice] = useQueryState(
    "price",
    parseAsString.withDefault("")
  );
  const [carType, setCarType] = useQueryState(
    "carType",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  const [condition, setCondition] = useQueryState(
    "condition",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  const [color, setColor] = useQueryState(
    "color",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  // Get all current filter values
  const getFilters = () => ({
    brand,
    model,
    fuelType,
    yearMin,
    yearMax,
    price,
    carType,
    condition,
    color,
  });

  // Update a specific filter (handles both arrays and single values)
  const updateFilter = (
    key: FilterKeys,
    values: string[] | string | number | null
  ) => {
    switch (key) {
      case "brand":
        return setBrand(Array.isArray(values) ? values : null);
      case "model":
        return setModel(Array.isArray(values) ? values : null);
      case "fuelType":
        return setFuelType(Array.isArray(values) ? values : null);
      case "year_min":
        return setYearMin(typeof values === "number" ? values : null);
      case "year_max":
        return setYearMax(typeof values === "number" ? values : null);
      case "price":
        return setPrice(typeof values === "string" ? values : null);
      case "carType":
        return setCarType(Array.isArray(values) ? values : null);
      case "condition":
        return setCondition(Array.isArray(values) ? values : null);
      case "color":
        return setColor(Array.isArray(values) ? values : null);
      default:
        throw new Error(`Invalid filter key: ${key}`);
    }
  };

  // Clear all filters
  const clearFilters = async () => {
    await Promise.all([
      setBrand(null),
      setModel(null),
      setFuelType(null),
      setYearMin(null),
      setYearMax(null),
      setPrice(null),
      setCarType(null),
      setCondition(null),
      setColor(null),
    ]);
  };

  return {
    filters: getFilters(),
    updateFilter,
    clearFilters,
  };
};

export default useFilters;
