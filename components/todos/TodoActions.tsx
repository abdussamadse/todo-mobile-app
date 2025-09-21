import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface TodoActionsProps {
  isCompleted: boolean;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
  colors: any;
}

export default function TodoActions({
  isCompleted,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  colors,
}: TodoActionsProps) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {!isCompleted && (
        <>
          {isEditing ? (
            <>
              <TouchableOpacity onPress={onSave} style={{ marginRight: 12 }}>
                <Text
                  style={{
                    color: colors.gradients.primary[0],
                    fontWeight: "600",
                  }}
                >
                  Save
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onCancel} style={{ marginRight: 12 }}>
                <Text style={{ color: colors.textMuted, fontWeight: "600" }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity onPress={onEdit} style={{ marginRight: 12 }}>
              <Ionicons
                name="create-outline"
                size={20}
                color={colors.textMuted}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onDelete}>
            <Ionicons name="trash" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        </>
      )}

      {isCompleted && (
        <TouchableOpacity onPress={onDelete}>
          <Ionicons name="trash" size={20} color={colors.textMuted} />
        </TouchableOpacity>
      )}
    </View>
  );
}
