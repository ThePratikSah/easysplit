import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Groups from "@/screens/Groups";
import GroupExpense from "@/screens/GroupExpense";
import CreateGroup from "@/screens/CreateGroup";
import React from "react";
import { Button } from "react-native-paper";
import useAuthentication from "@/hooks/useAuthentication";

const { Navigator, Screen } = createNativeStackNavigator();

const AppStack = () => {
  const { logout } = useAuthentication();
  return (
    <Navigator>
      <Screen
        name="Groups"
        component={Groups}
        options={{
          headerRight: () => <Button onPress={() => logout()}>Logout</Button>,
        }}
      />
      <Screen
        name="CreateGroup"
        component={CreateGroup}
        options={{ title: "Create Group" }}
      />
      <Screen
        name="GroupsExpense"
        component={GroupExpense}
        options={{ title: "Group Expense" }}
      />
    </Navigator>
  );
};

export default AppStack;
