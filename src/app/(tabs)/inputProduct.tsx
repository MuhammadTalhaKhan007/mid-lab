import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import styles from "../../Styles/newProductsPageStyle";
import { usePostProducts } from "../../components/APIs/postProductsAPI";
import {
  useNavigation,
  NavigationProp,
  useFocusEffect,
} from "@react-navigation/native";

export default function InputProduct() {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [postData, setPostData] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<any>>();
  const { postProducts, isLoading, error } = usePostProducts();

  useEffect(() => {
    if (postData) {
      postProducts(title, price, image, description);
      setPostData(false);
      resetFrom();
      navigation.navigate("productsPage");
    }
  }, [postData, title, price, image, description]);

  const resetFrom = () => {
    setTitle("");
    setPrice(0);
    setImage("");
    setDescription("");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Product Title</Text>
      <TextInput
        style={styles.input}
        onChangeText={(title) => setTitle(title)}
        placeholder="Enter Product Title..."
        value={title}
      />
      <Text style={styles.label}>Product Price</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setPrice(Number(value))}
        placeholder="Enter Product Price..."
        value={price.toString()}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Product Image</Text>
      <TextInput
        multiline
        numberOfLines={10}
        style={styles.inputImage}
        onChangeText={(value) => setImage(value)}
        value={image}
        placeholder="Paste Image Link Here..."
        keyboardType="default"
      />
      <Text style={styles.label}>Product Description</Text>
      <TextInput
        multiline
        numberOfLines={4}
        value={description}
        style={styles.inputDescription}
        onChangeText={(value) => setDescription(value)}
        placeholder="Enter Product Description..."
        keyboardType="default"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setPostData(true);
        }}
      >
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
      {isLoading && <Text>Loading...</Text>}
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </View>
  );
}
