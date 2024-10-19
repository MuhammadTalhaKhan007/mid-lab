import { useState, useEffect } from "react";
import { GetProductsAPIResponse } from "../../Data/types";
import { BASE_URL } from "react-native-dotenv";

const GetProductsAPI = (pageNumber: number) => {
  const [data, setData] = useState<GetProductsAPIResponse | null>(null);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products?page=${pageNumber};`);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  return data?.docs || [];
};

export default GetProductsAPI;
