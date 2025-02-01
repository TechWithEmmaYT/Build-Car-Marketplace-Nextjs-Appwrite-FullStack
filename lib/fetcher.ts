import { ListingType, LoginType, RegisterType } from "@/@types/api.type";
import axios from "axios";

export const loginMutationFn = async (data: LoginType) =>
  await axios.post("/api/login", data);

export const registerMutationFn = async (data: RegisterType) =>
  await axios.post("/api/register", data);

export const logoutMutationFn = async () => await axios.post("/api/logout");

//get single listing
export const getSingleListingMutationFn = async (listingId: string) => {
  const response = await axios.get(`/api/listing/${listingId}`);
  return response.data;
};

// Get My shop and listings
export const getMyShopMutationFn = async () => {
  const response = await axios.get("/api/shop");
  return response.data;
};

// Add listing
export const addListingMutationFn = async (data: ListingType) =>
  await axios.post("/api/add-listing", data);

export const getCurrentUserMutationFn = async () => {
  const response = await axios.get("/api/current-user");
  return response.data;
};
