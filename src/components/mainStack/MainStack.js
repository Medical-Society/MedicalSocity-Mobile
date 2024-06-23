import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Drawer from "../drawer/Drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AiChatbot from "../../screens/Chat/AiChatbot";
import OcrResultScreen from "../../screens/OCR/OcrResultScreen";
import DoctorStack from "../DoctorStack/DoctorStack";
import MainTab from "../mainTab/MainTab";
import ViewPrescription from "../../screens/Prescription/ViewPrescriptionScreen";
import ViewScannedPrescriptionScreen from "../../screens/Prescription/ViewScannedPrescriptionScreen";
import { colors } from "../../../AppStyles";
const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Drawer"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.White,
        },
      }}>
      <Stack.Screen component={MainTab} name="MainTab" />
      <Stack.Screen component={OcrResultScreen} name="OcrResult" />
      <Stack.Screen component={AiChatbot} name="AiChatbot" />
      <Stack.Screen component={DoctorStack} name="DoctorStack" />
      <Stack.Screen
        name="ViewPrescription"
        component={ViewPrescription}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewScannedPrescription"
        component={ViewScannedPrescriptionScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default MainStack;
