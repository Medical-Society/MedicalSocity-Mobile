import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home";
import Doctor from "../../screens/Doctor";
const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Doctor" component={Doctor} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default HomeStack;
