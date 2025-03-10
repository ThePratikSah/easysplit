import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import useIsLoggedIn from "./hooks/useIsLoggedIn";
import AuthStack from "./navigation/AuthStack";
import AppStack from "./navigation/AppStack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import Toast from "react-native-toast-message";

const { Navigator, Screen } = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  const { isLoggedIn } = useIsLoggedIn();
  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <QueryClientProvider client={queryClient}>
            <Navigator screenOptions={{ headerShown: false }}>
              {!isLoggedIn ? (
                <Screen name="AuthStack" component={AuthStack} />
              ) : (
                <Screen name="AppStack" component={AppStack} />
              )}
            </Navigator>
          </QueryClientProvider>
        </NavigationContainer>
      </PaperProvider>
      <Toast />
    </>
  );
}
