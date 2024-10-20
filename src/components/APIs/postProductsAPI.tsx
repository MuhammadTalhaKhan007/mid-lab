import { useState } from "react";
import { BASE_URL } from "@env";

export const usePostProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postProducts = async (
    title: string,
    price: number,
    image: string,
    description: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          price: Number(price),
          image,
          description,
          available: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Product created successfully:", data);
    } catch (err) {
      setError("An error occurred while posting product");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { postProducts, isLoading, error };
};
