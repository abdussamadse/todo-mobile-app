import { useTheme } from "@/hooks/useTheme";
import { createTodo } from "@/lib/api/todos";
import { darkColors, lightColors } from "@/lib/colors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function TodoInput() {
  const [task, setTask] = useState<string>("");
  const { theme } = useTheme();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTask: string) => createTodo({ title: newTask }),
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"] as any);
      setTask("");
    },
  });

  const handleAddTask = () => {
    if (!task.trim()) return;
    mutation.mutate(task);
  };

  const colors = theme === "dark" ? darkColors : lightColors;

  return (
    <View className="px-6 mb-3 flex-row items-center">
      {/* TextInput container */}
      <View
        className="flex-1 rounded-xl border overflow-hidden"
        style={{
          borderColor: colors.border,
          backgroundColor: colors.backgrounds.input,
          marginRight: 12, // gap between input and button
        }}
      >
        <TextInput
          value={task}
          onChangeText={setTask}
          placeholder="Add a new task"
          placeholderTextColor={colors.textMuted}
          className="p-4 text-base outline-none"
          style={{
            color: colors.text,
            backgroundColor: colors.backgrounds.input,
          }}
        />
      </View>

      {/* Add button */}
      <TouchableOpacity onPress={handleAddTask} disabled={mutation.isPending}>
        <LinearGradient
          colors={colors.gradients.primary}
          className="w-14 h-14 rounded-lg justify-center items-center"
        >
          {mutation.isPending ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className="text-white font-semibold">Add</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
