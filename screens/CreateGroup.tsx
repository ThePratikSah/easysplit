import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Chip,
  TextInput,
  Title,
} from "react-native-paper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroup } from "@/config/firebase-helper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/constants/interface";

type CreateGroupProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "GroupsExpense">;
};

const categories = ["Trip", "Home", "Couple", "Other"];

export default function CreateGroup({ navigation }: CreateGroupProps) {
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Trip");

  const handleChipPress = (category: string) => {
    setSelectedCategory(category);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createGroup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["groups"] }),
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      navigation.replace("GroupsExpense", { id: mutation?.data, title: name });
    }
  }, [mutation.isSuccess, navigation]);

  function handleFormSubmit() {
    if (!selectedCategory) return;
    mutation.mutate({
      category: selectedCategory,
      name,
      userId: "Nd0yFruaSYa0SoQmHP4NWZfyMMY2",
    });
  }

  return (
    <View style={style.container}>
      <TextInput
        mode="outlined"
        style={style.inputWrapper}
        label={"Name"}
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <Title style={{ fontSize: 14 }}>Type</Title>
      <View
        style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 10 }}
      >
        {categories.map((category) => (
          <Chip
            key={category}
            mode="outlined"
            showSelectedOverlay={selectedCategory === category}
            selected={selectedCategory === category}
            style={{ marginRight: 5 }}
            icon={
              category === "Trip"
                ? "airplane"
                : category === "Home"
                ? "home"
                : category === "Couple"
                ? "heart"
                : "information"
            }
            onPress={() => handleChipPress(category)}
          >
            {category}
          </Chip>
        ))}
      </View>
      {mutation?.isPending ? (
        <ActivityIndicator />
      ) : (
        <Button
          onPress={handleFormSubmit}
          style={{ marginVertical: 10 }}
          mode="outlined"
        >
          Create Group
        </Button>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 10,
  },
  inputWrapper: {
    marginBottom: 20,
  },
});
