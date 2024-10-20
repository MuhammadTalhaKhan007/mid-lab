import { useState, useEffect } from "react";
import { GetProductsAPIResponse } from "../../Data/types";
import { BASE_URL } from "@env";

export const fetchProductsFromAPI = async (
  page: number
): Promise<GetProductsAPIResponse> => {
  const response = await fetch(`${BASE_URL}/products?page=${page}`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return await response.json();
};
