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
          name="mainFlow"
          component={MainTab}
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
      <Stack.Navigator initialRouteName="Welcome">
        {resolvedScreen}
        {authOrMainFlowScreen}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};
