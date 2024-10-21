import { useState, useEffect } from "react";
import { FoodItem } from "../../Data/types";
import { BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useFetchFood = () => {
  const [data, setData] = useState<FoodItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndStoreProducts = async () => {
      try {
        const response = await fetch(
          "https://simple-grocery-store-api.online/products"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const responseData: FoodItem[] = await response.json();
        setData(responseData);

        const categorizedData: { [key: string]: FoodItem[] } = {};

        responseData.forEach((item) => {
          if (!categorizedData[item.category]) {
            categorizedData[item.category] = [];
          }
          categorizedData[item.category].push(item);
        });

        for (const category in categorizedData) {
          const isCategorySet = await AsyncStorage.getItem(category);
          if (!isCategorySet) {
            await AsyncStorage.setItem(
              category,
              JSON.stringify(categorizedData[category])
            );
            console.log(`Data for category ${category} initialized.`);
          } else {
            console.log(`Data for category ${category} already exists.`);
          }
        }
      } catch (err) {
        setError("An error occurred while fetching products");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndStoreProducts();
  }, []);

  return { data, isLoading, error };
};
