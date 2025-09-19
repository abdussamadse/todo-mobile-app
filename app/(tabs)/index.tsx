import Header from "@/components/todos/Header";
import { useTheme } from "@/hooks/useTheme";
import { darkColors, lightColors } from "@/lib/colors";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { getTodos } from "../../lib/api/todos";

export default function HomeScreen() {
  const { theme } = useTheme();
  const colors = theme === "light" ? lightColors : darkColors;

  // Fetch todos using React Query
  const { data } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  // Extract todos array from API response
  const todos = data?.data || [];

  return (
    <LinearGradient colors={colors.gradients.background} className="flex-1">
      <SafeAreaView className="flex-1">
        <Header todos={todos} />
      </SafeAreaView>
    </LinearGradient>
  );
}
