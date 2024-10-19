import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import GetProductsAPI from "../components/APIs/getProductsAPI";
import { Product } from "../Data/types";

const ProductsPage = () => {
  const products = GetProductsAPI(1);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  listContainer: {
    padding: 16,
  },
  productCard: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  productInfo: {
    padding: 16,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  productPrice: {
    fontSize: 18,
    color: "#e91e63",
    marginBottom: 8,
    fontWeight: "600",
  },
  productDescription: {
    fontSize: 14,
    marginBottom: 8,
    color: "#666",
    lineHeight: 20,
  },
  availabilityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  availabilityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  productAvailability: {
    fontSize: 14,
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  footerLoader: {
    marginVertical: 20,
    alignItems: "center",
  },
});

export default ProductsPage;
