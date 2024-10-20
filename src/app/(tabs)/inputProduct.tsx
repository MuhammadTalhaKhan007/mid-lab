import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import styles from "../../Styles/newProductsPageStyle";

export default function InputProduct() {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Product Title</Text>
      <TextInput
        style={styles.input}
        onChangeText={(title) => setTitle(title)}
        placeholder="Enter Product Title..."
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
        placeholder="Paste Image Link Here..."
        keyboardType="default"
      />
      <Text style={styles.label}>Product Description</Text>
      <TextInput
        multiline
        numberOfLines={4}
        style={styles.inputDescription}
        onChangeText={(value) => setDescription(value)}
        placeholder="Enter Product Description..."
        keyboardType="default"
      />
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
}
