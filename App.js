import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./src/components/auth/AuthStack";
import MainTab from "./src/components/mainTab/MainTab";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import React, { useContext, useMemo } from "react";
import {
  Context as AuthContext,
  Provider as AuthProvider,
} from "./src/context/AuthContext";
import {
  Context as UserContext,
  Provider as UserProvider,
} from "./src/context/UserContext";
import Drawer from "./src/components/drawer/Drawer";
const Stack = createNativeStackNavigator();

const App = () => {
  const { state } = useContext(AuthContext);

  const resolvedScreen = useMemo(() => {
    if (state.isLoading) {
      return (
        <Stack.Screen
          name="ResolveAuth"
          component={ResolveAuthScreen}
          options={{ headerShown: false }}
        />
      );
    }
    return null;
  }, [state.isLoading]);

  const authOrMainFlowScreen = useMemo(() => {
    if (state.token) {
      return (
        <Stack.Screen
          name="Drawer"
          component={Drawer}
          options={{ headerShown: false }}
        />
      );
    }
    return (
      <Stack.Screen
        name="authFlow"
        component={AuthStack}
        options={{ headerShown: false }}
      />
    );
  }, [state.token]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {
            backgroundColor: "#FFFFFF",
          },
        }}
        initialRouteName="Welcome"
      >
        {resolvedScreen}
        {authOrMainFlowScreen}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <UserProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </UserProvider>
  );
};
