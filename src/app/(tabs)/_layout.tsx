import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, Platform } from "react-native";
import { FontAwesomeIcon as RNFontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { FontAwesomeIcon as WebFontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";
import {
  faArrowLeft,
  faShoppingCart,
  faUtensils,
  faHome,
  faCommentDots,
  faHeart,
  faUser,
  faAreaChart,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Icon from "react-native-vector-icons/Ionicons";
const FontAwesomeIcon =
  Platform.OS === "web" ? WebFontAwesomeIcon : RNFontAwesomeIcon;
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "brown",
        tabBarInactiveTintColor: "gray",
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tab One",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon
              icon={faCommentDots}
              size={Platform.OS === "web" ? ("25px" as any) : 25}
              color={color}
            />
          ),
          headerRight: () => (
            <Link href="/productsPage" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="battery" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="inputProduct"
        options={{
          title: "New Product",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon
              icon={faPlus}
              size={Platform.OS === "web" ? ("25px" as any) : 25}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
