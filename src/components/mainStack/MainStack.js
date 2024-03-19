import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Drawer from "../drawer/Drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AiChatbot from "../../screens/Chat/AiChatbot";
import OcrResultScreen from "../../screens/Ocr/OcrResultScreen";
const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Drawer"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#FFFFFF",
        },
      }}
    >
      <Stack.Screen component={Drawer} name="Drawer" />
      <Stack.Screen component={AiChatbot} name="AiChatbot" />
      <Stack.Screen component={OcrResultScreen} name="OcrResultScreen" />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default MainStack;
