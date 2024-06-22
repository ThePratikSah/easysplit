import { View, Text } from "react-native";
import React from "react";

export default function GroupExpense({ route, navigation }) {
  const { id } = route.params;
  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
}
