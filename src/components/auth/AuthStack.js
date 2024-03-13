import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../../screens/Welcome";
import Login from "../../screens/Login";
import SignUp from "../../screens/SignUp";
import ForgetPassword from "../../screens/ForgetPassword";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: "#FFFFFF",
        },
      }}
      initialRouteName="Welcome"
    >
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
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
