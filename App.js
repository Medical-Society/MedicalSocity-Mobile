import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Welcome from "./src/screens/Welcome";
import Login from "./src/screens/Login";
import SignUp from "./src/screens/SignUp";

import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import {
  Context as AuthContext,
  Provider as AuthProvider,
} from "./src/context/AuthContext";
import { useContext } from "react";

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const MainTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const App = () => {
  const { state } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        {state.isLoading ? (
          <Stack.Screen
            name="ResolveAuth"
            component={ResolveAuthScreen}
            options={{ headerShown: false }}
          />
        ) : null}
        {state.token ? (
          <Stack.Screen
            name="mainFlow"
            component={MainTab}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="authFlow"
            component={AuthStack}
            options={{ headerShown: false }}
          />
        )}
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
