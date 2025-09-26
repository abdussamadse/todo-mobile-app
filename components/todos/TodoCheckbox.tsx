import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { useState } from "react";

interface TodoCheckboxProps {
  isCompleted: boolean;
  colors: any;
  onToggle: () => void;
  toggleMutation: any; // expect this to be from React Query or similar
  item: any;
}

export default function TodoCheckbox({
  isCompleted,
  colors,
  onToggle,
  toggleMutation,
  item,
}: TodoCheckboxProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleToggle = () => {
    setActiveId(item._id); // mark current checkbox as active
    onToggle(); // call parent toggle logic
    toggleMutation.mutate(item._id, {
      onSettled: () => {
        setActiveId(null); // reset after mutation finishes
      },
    });
  };

  return (
    <TouchableOpacity
      style={{ flexDirection: "row", alignItems: "center" }}
      onPress={handleToggle}
    >
      <View
        style={{
          width: 20,
          height: 20,
          marginRight: 12,
          borderRadius: 4,
          borderWidth: 2,
          borderColor: colors.border,
          backgroundColor: isCompleted
            ? colors.gradients.success[0]
            : "transparent",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {toggleMutation.isPending && activeId === item._id ? (
          <ActivityIndicator size="14" color="white" />
        ) : (
          isCompleted && <Ionicons name="checkmark" size={16} color="white" />
        )}
      </View>
    </TouchableOpacity>
  );
}
