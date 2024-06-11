import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Drawer from "../drawer/Drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AiChatbot from "../../screens/Chat/AiChatbot";
import OcrResultScreen from "../../screens/Ocr/OcrResultScreen";
import DoctorStack from "../DoctorStack/DoctorStack";
import MainTab from "../mainTab/MainTab";
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
      }}>
      <Stack.Screen component={MainTab} name="MainTab" />
      <Stack.Screen component={AiChatbot} name="AiChatbot" />
      <Stack.Screen component={OcrResultScreen} name="OcrResult" />
      <Stack.Screen component={DoctorStack} name="DoctorStack" />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default MainStack;
