import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Text, View } from "react-native";
import { Product, GetProductsAPIResponse } from "../Data/types";
import { BASE_URL } from "@env";
import { useFetchProducts } from "../components/APIs/getProductsAPI";
import styles from "../Styles/productsPageStyles";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [load, setLoad] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { data, isLoading, error } = useFetchProducts(currentPage, load);

  useEffect(() => {
    if (data) {
      if (currentPage === 1) {
        setProducts(data.docs);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...data.docs]);
      }
      setTotalPages(data.totalPages);
    }
  }, [data]);

  const handleLoadMore = () => {
    if (currentPage < totalPages && !isLoading) {
      setLoad(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleRefresh = () => {
    if (!isRefreshing) {
      setIsRefreshing(true);
      setCurrentPage(1);
      setIsRefreshing(false);
    }
  };
  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <View style={styles.availabilityContainer}>
          <View
            style={[
              styles.availabilityDot,
              { backgroundColor: item.available ? "green" : "red" },
            ]}
          />
          <Text style={styles.productAvailability}>
            {item.available ? "Available" : "Not Available"}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderFooter = () => {
    if (!load) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={["#0000ff"]}
            tintColor="#0000ff"
          />
        }
      />
    </View>
  );
}
