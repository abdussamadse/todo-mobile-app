import { useTheme } from "@/hooks/useTheme";
import { darkColors, lightColors } from "@/lib/colors";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

type Todo = {
  _id: string;
  status: string;
};

export default function Header({ todos }: { todos: Todo[] }) {
  const { theme } = useTheme();
  const colors = theme === "light" ? lightColors : darkColors;

  // Calculate completed todos and progress
  const completedTodos = todos.filter((todo) => todo.status === "completed");
  const totalTodos = todos.length;
  const progressPercentage =
    totalTodos === 0 ? 0 : (completedTodos.length / totalTodos) * 100;

  return (
    <View className="px-6 py-8">
      <View className="flex-row items-center mb-5">
        <LinearGradient
          colors={colors.gradients.primary}
          className="w-14 h-14 rounded-lg justify-center items-center mr-4"
        >
          <Ionicons name="flash-outline" size={28} color="#fff" />
        </LinearGradient>

        <View className="flex-1">
          <Text className="text-[32px] font-bold tracking-[-1px] mb-1 text-light-text dark:text-dark-text">
            Today&apos;s Tasks
          </Text>
          <Text className="text-[17px] font-medium text-light-textMuted dark:text-dark-textMuted">
            {completedTodos.length} of {totalTodos} completed
          </Text>
        </View>
      </View>

      {/* Progress Bar Background */}
      <View className="mt-2 flex-row gap-4 items-center">
        <View className="h-3 w-4/5 rounded-full bg-light-border dark:bg-dark-border overflow-hidden">
          {/* Progress Bar Fill */}
          <LinearGradient
            colors={colors.gradients.success}
            style={{
              width: `${progressPercentage}%`,
              height: "100%",
              borderRadius: 8,
            }}
          />
        </View>

        {/* Percentage Text */}
        <Text className="text-[12px] w-1/1 font-medium text-light-textMuted dark:text-dark-textMuted">
          {Math.round(progressPercentage)}%
        </Text>
      </View>
    </View>
  );
}
