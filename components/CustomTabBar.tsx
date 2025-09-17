import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, Text, View } from "react-native";

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View className="absolute bottom-6 left-4 right-4 flex-row rounded-2xl bg-white shadow-lg py-4 px-3 justify-between">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title || route.name;
        const isFocused = state.index === index;

        return (
          <Pressable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            className="items-center flex-1"
          >
            <Ionicons
              name={options.tabBarIcon as any}
              size={24}
              color={isFocused ? "#2563eb" : "#9ca3af"}
            />
            <Text
              className={`text-xs mt-1 ${
                isFocused ? "text-blue-600 font-semibold" : "text-gray-400"
              }`}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
