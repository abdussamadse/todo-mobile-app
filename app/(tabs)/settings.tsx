import { useTheme } from "@/hooks/useTheme";
import { Button, Text, View } from "react-native";

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();

  return (
    <View className="flex-1 items-center justify-center bg-light-bg dark:bg-dark-bg">
      <Text className="text-light-text dark:text-dark-text">Current theme: {theme}</Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
}
