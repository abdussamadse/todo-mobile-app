import { Text, TextInput } from "react-native";

interface TodoTitleProps {
  isEditing: boolean;
  isCompleted: boolean;
  title: string;
  newTitle: string;
  setNewTitle: (text: string) => void;
  colors: any;
}

export default function TodoTitle({
  isEditing,
  isCompleted,
  title,
  newTitle,
  setNewTitle,
  colors,
}: TodoTitleProps) {
  return isEditing ? (
    <TextInput
      value={newTitle}
      onChangeText={setNewTitle}
      style={{
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: colors.textMuted,
        color: colors.text,
        fontSize: 16,
      }}
    />
  ) : (
    <Text
      style={{
        color: colors.text,
        fontSize: 16,
        textDecorationLine: isCompleted ? "line-through" : "none",
      }}
    >
      {title}
    </Text>
  );
}
