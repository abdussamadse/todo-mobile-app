import { useTheme } from "@/hooks/useTheme";
import { deleteTodo, updateTodo } from "@/lib/api/todos";
import { darkColors, lightColors } from "@/lib/colors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FlatList, Text } from "react-native";
import TodoItem from "./TodoItem";

export interface Todo {
  _id: string;
  title: string;
  status: "pending" | "completed" | "in-progress";
}

interface TodoListProps {
  todos: Todo[];
}

export default function TodoList({ todos }: TodoListProps) {
  const { theme } = useTheme();
  const colors = theme === "dark" ? darkColors : lightColors;
  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: (todo: Todo) => {
      const newStatus = todo.status === "completed" ? "pending" : "completed";
      return updateTodo(todo._id, { status: newStatus });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) =>
      updateTodo(id, { title }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TodoItem
          item={item}
          colors={colors}
          toggleMutation={toggleMutation}
          deleteMutation={deleteMutation}
          updateMutation={updateMutation}
        />
      )}
      contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 6 }}
      ListEmptyComponent={
        <Text
          style={{
            textAlign: "center",
            marginTop: 24,
            color: colors.textMuted,
          }}
        >
          No todos found
        </Text>
      }
      showsVerticalScrollIndicator={false}
    />
  );
}
