import { useState, useEffect } from "react";
import { GetProductsAPIResponse } from "../../Data/types";
import { BASE_URL } from "@env";

export const useFetchProducts = (page: number, load: boolean) => {
  const [data, setData] = useState<GetProductsAPIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(load);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products?page=${page}`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (err) {
        setError("An error occurred while fetching products");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  return { data, isLoading, error };
};
