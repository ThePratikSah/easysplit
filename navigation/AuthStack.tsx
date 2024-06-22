import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "@/screens/Login";

const { Navigator, Screen } = createNativeStackNavigator();

const AuthStack = () => (
  <Navigator>
    <Screen name="Login" component={Login} />
  </Navigator>
);

export default AuthStack;
