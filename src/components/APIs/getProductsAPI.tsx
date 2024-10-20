import { useState, useEffect } from "react";
import { GetProductsAPIResponse } from "../../Data/types";
import { BASE_URL } from "@env";

const useGetProductsAPI = (pageNumber: number) => {
  const [data, setData] = useState<GetProductsAPIResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${BASE_URL}/products?page=${pageNumber}`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const json: GetProductsAPIResponse = await response.json();
        setData(json);
      } catch (error) {
        setError((error as Error).message);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, [pageNumber]);

  return { data, isLoading, error };
};

export default useGetProductsAPI;
