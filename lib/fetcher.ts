import { AddListingType, LoginType, RegisterType } from "@/@types/api.type";
import axios from "axios";

export const loginMutationFn = async (data: LoginType) =>
  await axios.post("/api/login", data);

export const registerMutationFn = async (data: RegisterType) =>
  await axios.post("/api/register", data);

//protected
export const logoutMutationFn = async () => await axios.post("/api/logout");

export const getCurrentUserMutationFn = async () => {
  const response = await axios.get("/api/current-user");
  return response.data;
};

// Add listing
export const addListingMutationFn = async (data: AddListingType) =>
  await axios.post("/api/add-listing", data);
