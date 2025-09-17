import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-light-bg dark:bg-dark-bg">
      <Text className="text-light-text dark:text-dark-text text-xl font-bold">
        Hello World
      </Text>
    </View>
  );
}
