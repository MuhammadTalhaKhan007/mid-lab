import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ListRenderItemInfo,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFetchFood } from "../../components/APIs/getFoodAPI";
import { FoodItem } from "../../Data/types";

const categories = [
  { id: "bread-bakery", name: "Bakery" },
  { id: "dairy", name: "Dairy" },
  { id: "candy", name: "Candy" },
  { id: "meat-seafood", name: "Meat & Seafood" },
  { id: "fresh-produce", name: "Fresh Produce" },
  { id: "coffee", name: "Coffee" },
];

export default function TabOneScreen() {
  const { data, isLoading, error } = useFetchFood();
  const [selectedCategory, setSelectedCategory] =
    useState<string>("bread-bakery");
  const [categoryData, setCategoryData] = useState<FoodItem[]>([]);

  useEffect(() => {
    fetchCategoryData(selectedCategory);
  }, [selectedCategory]);

  const fetchCategoryData = async (category: string) => {
    try {
      const storedData = await AsyncStorage.getItem(category);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setCategoryData(parsedData);
      } else {
        setCategoryData([]);
      }
    } catch (err) {
      console.error("Failed to retrieve category data:", err);
    }
  };

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<FoodItem>) => {
    let cardStyle;
    if (index % 2 === 0) {
      cardStyle = styles.leftCard;
    } else {
      cardStyle = styles.rightCard;
    }

    return (
      <View style={[styles.card, cardStyle]}>
        <Image
          source={{
            uri: "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg",
          }}
          style={styles.image}
        />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.availability}>
          {item.inStock ? "In Stock" : "Out of Stock"}
        </Text>
      </View>
    );
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading data</Text>;
  }

  return (
    <>
      <ScrollView horizontal style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.activeCategoryButton,
            ]}
            onPress={() => handleCategoryPress(category.id)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.activeCategoryText,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.container}>
        <FlatList
          data={categoryData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 25,
    backgroundColor: "#f9f9f9",
    paddingTop: 10,
  },
  list: {
    justifyContent: "flex-start",
  },
  categoryContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 5,
    marginTop: 0,
  },
  categoryButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  activeCategoryButton: {
    borderBottomWidth: 3,
    borderBottomColor: "brown",
    paddingBottom: 5,
  },
  categoryText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
    marginHorizontal: 33,
  },
  activeCategoryText: {
    color: "brown",
    fontWeight: "bold",
  },
  card: {
    flex: 1,
    margin: 5,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  leftCard: {
    height: 400,
  },
  rightCard: {
    height: 240,
    paddingTop: 10,
  },
  image: {
    width: "100%",
    height: "75%",
    borderRadius: 10,
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  category: {
    color: "#666",
    fontSize: 14,
  },
  availability: {
    color: "#888",
  },
});
