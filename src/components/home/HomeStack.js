import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home";
import ResultsShowScreen from "../../screens/Search/ResultsShowScreen";
import { colors } from "../../../AppStyles";
const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: colors.White,
        },
      }}
      initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ResultsShow"
        component={ResultsShowScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};


export default HomeStack;
