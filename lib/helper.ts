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
