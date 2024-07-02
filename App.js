import "react-native-reanimated";
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./src/components/auth/AuthStack";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import React, { useContext, useMemo } from "react";
import {
  Context as AuthContext,
  Provider as AuthProvider,
} from "./src/context/AuthContext";
import { Provider as UserProvider } from "./src/context/UserContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainStack from "./src/components/mainStack/MainStack";
import { StatusBar } from "expo-status-bar";
import { colors } from "./AppStyles";

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
          name="mainStack"
          component={MainStack}
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
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar translucent backgroundColor="transparent" />

        <Stack.Navigator
          screenOptions={{
            contentStyle: {
              backgroundColor: colors.White,
            },
          }}
          initialRouteName="Welcome">
          {resolvedScreen}
          {authOrMainFlowScreen}
          {/* <Stack.Screen
            name="IOT"
            component={HomeIotScreen}
            options={{ headerShown: false }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const AppWithProviders = () => {
  return (
    <UserProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </UserProvider>
  );
};

export default AppWithProviders;
