import {
  AllCarListingPayloadType,
  ListingType,
  LoginType,
  RegisterType,
} from "@/@types/api.type";
import axios from "axios";

export const loginMutationFn = async (data: LoginType) =>
  await axios.post("/api/login", data);

export const registerMutationFn = async (data: RegisterType) =>
  await axios.post("/api/register", data);

export const logoutMutationFn = async () => await axios.post("/api/logout");

//get all Lising and query

export const getAllCarListingQueryFn = async ({
  brand,
  model,
  color,
  keyword,
  price,
  year_max,
  year_min,
}: AllCarListingPayloadType) => {
  const baseUrl = `/api/listing`;

  const queryParams = new URLSearchParams();
  if (brand && brand.length !== 0) queryParams.append("brand", brand.join(","));
  if (model && model.length !== 0) queryParams.append("model", model.join(","));
  if (color && color.length !== 0) queryParams.append("color", color.join(","));
  if (price) queryParams.append("price", price);
  if (keyword) queryParams.append("keyword", keyword);
  if (year_min) queryParams.append("year_min", year_min?.toString());
  if (year_max) queryParams.append("year_max", year_max?.toString());

  const url = queryParams.toString() ? `${baseUrl}?${queryParams}` : baseUrl;
  const response = await axios.get(url);
  return response.data;
};

//get single listing
export const getSingleListingQueryFn = async (listingId: string) => {
  const response = await axios.get(`/api/listing/${listingId}`);
  return response.data;
};

// Get My shop and listings
export const getMyShopQueryFn = async () => {
  const response = await axios.get("/api/shop");
  return response.data;
};

// Get Shop by shopId
export const getShopByIdQueryFn = async (shopId: string) => {
  console.log(shopId);
  const response = await axios.get(`/api/shop/${shopId}`);
  return response.data;
};

// Add listing
export const addListingMutationFn = async (data: ListingType) =>
  await axios.post("/api/add-listing", data);

export const getCurrentUserMutationFn = async () => {
  const response = await axios.get("/api/current-user");
  return response.data;
};
