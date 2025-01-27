import { CAR_PRICE_RANGE_OPTIONS } from "@/constants/cars";

export function createSlug(name: string): string {
  const lowerCaseName = name?.toLowerCase();
  const slug = lowerCaseName?.replace(/\s+/g, "-");
  const finalSlug = slug?.replace(/[^a-z0-9-]/g, "");
  return finalSlug;
}

export const slugToCarName = (slug: string): string => {
  const words = slug?.split("-");
  const carName = words
    ?.map((word) => word.charAt(0)?.toUpperCase() + word?.slice(1))
    ?.join(" ");
  return carName;
};

export const formatCurrency = (
  amount: number,
  currency: string = "$"
): string => {
  return `${currency}${amount.toLocaleString()}`;
};

export const formatPriceRange = (
  min: number,
  max: number,
  currency: string = "$"
): string => {
  return `${formatCurrency(min, currency)} - ${formatCurrency(max, currency)}`;
};

export const calculatePriceRange = () => {
  let minPrice = Infinity;
  let maxPrice = -Infinity;

  CAR_PRICE_RANGE_OPTIONS.forEach((option) => {
    if (option.value !== "custom") {
      const [min, max] = option.value.split("-").map(Number);
      minPrice = Math.min(minPrice, min);
      maxPrice = Math.max(maxPrice, max);
    }
  });
  return {
    minPrice: minPrice === Infinity ? 0 : minPrice,
    maxPrice: maxPrice === -Infinity ? 100000 : maxPrice,
  };
};
