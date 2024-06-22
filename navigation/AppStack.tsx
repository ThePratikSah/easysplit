import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Groups from "@/screens/Groups";
import GroupExpense from "@/screens/GroupExpense";
import CreateGroup from "@/screens/CreateGroup";

const { Navigator, Screen } = createNativeStackNavigator();

const AppStack = () => (
  <Navigator>
    <Screen name="Groups" component={Groups} />
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

export default AppStack;
