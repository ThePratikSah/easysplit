import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { Avatar, Button, TextInput } from "react-native-paper";

export default function AddExpense({ route, navigation }: any) {
  const { members } = route.params;
  return (
    <View style={style.container}>
      <Text>Group members</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={style.buttonScrollGroup}
      >
        <View style={{ flexDirection: "row" }}>
          {members?.map((member: string, index: number) => (
            <Avatar.Text
              key={index}
              style={{ marginRight: 5 }}
              size={40}
              label={member[0]?.toUpperCase()}
            />
          ))}
        </View>
      </ScrollView>
      <TextInput
        style={style.inputWrapper}
        mode="outlined"
        label={"Description"}
      />
      <TextInput style={style.inputWrapper} mode="outlined" label={"Amount"} />
      <Button>Paid by you and split equally</Button>
      <Button mode="contained">Add</Button>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 10,
  },
  inputWrapper: {
    marginBottom: 10,
  },
  loginButton: {
    borderRadius: 5,
  },
  buttonScrollGroup: {
    marginVertical: 10,
  },
});
