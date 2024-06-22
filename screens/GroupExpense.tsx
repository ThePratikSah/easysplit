import { View, Text } from "react-native";
import React, { useEffect } from "react";

export default function GroupExpense({ route, navigation }: any) {
  const { id, title } = route.params;
  useEffect(() => {
    navigation.setOptions({ title });
  }, []);
  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
}
