import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

interface TodoCheckboxProps {
  isCompleted: boolean;
  colors: any;
  onToggle: () => void;
}

export default function TodoCheckbox({
  isCompleted,
  colors,
  onToggle,
}: TodoCheckboxProps) {
  return (
    <TouchableOpacity
      style={{ flexDirection: "row", alignItems: "center" }}
      onPress={onToggle}
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
        {isCompleted && <Ionicons name="checkmark" size={16} color="white" />}
      </View>
    </TouchableOpacity>
  );
}
