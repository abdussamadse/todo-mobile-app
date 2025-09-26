import { useState } from "react";
import { Alert, View } from "react-native";
import TodoActions from "./TodoActions";
import TodoCheckbox from "./TodoCheckbox";
import TodoTitle from "./TodoTitle";

interface TodoItemProps {
  item: any;
  colors: any;
  toggleMutation: any;
  deleteMutation: any;
  updateMutation: any;
}

export default function TodoItem({
  item,
  colors,
  toggleMutation,
  deleteMutation,
  updateMutation,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);

  const isCompleted = item.status === "completed";

  const confirmDelete = () => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () =>
          deleteMutation.mutate(item._id, {
            onSuccess: () =>
              Alert.alert("Success", "Task deleted successfully!"),
          }),
      },
    ]);
  };

  const saveEdit = () => {
    if (!newTitle.trim()) return;
    updateMutation.mutate(
      { id: item._id, title: newTitle },
      {
        onSuccess: () => {
          setIsEditing(false);
          Alert.alert("Success", "Task updated successfully!");
        },
      }
    );
  };

  return (
    <View
      style={{
        backgroundColor: colors.backgrounds.input,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
      }}
    >
      {/* Left side: Checkbox + Title */}
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <TodoCheckbox
          isCompleted={isCompleted}
          colors={colors}
          onToggle={() => toggleMutation.mutate(item)}
          toggleMutation={toggleMutation}
          item={item}
        />
        <TodoTitle
          isEditing={isEditing}
          isCompleted={isCompleted}
          title={item.title}
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          colors={colors}
        />
      </View>

      {/* Right side: Action buttons */}
      <TodoActions
        isCompleted={isCompleted}
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
        onSave={saveEdit}
        onCancel={() => setIsEditing(false)}
        onDelete={confirmDelete}
        colors={colors}
        updateMutation={updateMutation}
      />
    </View>
  );
}
