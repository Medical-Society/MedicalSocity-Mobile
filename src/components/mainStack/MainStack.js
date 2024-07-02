import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AiChatbot from "../../screens/Chat/AiChatbot";
import DoctorStack from "../DoctorStack/DoctorStack";
import MainTab from "../mainTab/MainTab";
import ViewPrescription from "../../screens/Prescription/ViewPrescriptionScreen";
import { colors } from "../../../AppStyles";
import PrescriptionsScreen from "../../screens/Menu/PrescriptionsScreen";
import ScannedPrescriptionsScreen from "../../screens/Menu/ScannedPrescriptionsScreen";
import AppointmentsScreen from "../../screens/Menu/AppointmentsScreen";
import ScannedPrescriptionModal from "../prescription/ScannedPrescriptionModal";
import ChatScreen from "../../screens/Chat/ChatScreen";
import IotStackProvider from "../IOT/IotStack";
const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTab"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.White,
        },
      }}>
      <Stack.Screen component={MainTab} name="MainTab" />
      <Stack.Screen component={AiChatbot} name="AiChatbot" />
      <Stack.Screen component={DoctorStack} name="DoctorStack" />
      <Stack.Screen component={PrescriptionsScreen} name="Prescriptions" />
      <Stack.Screen
        component={ScannedPrescriptionsScreen}
        name="ScannedPrescriptions"
      />
      <Stack.Screen
        component={ChatScreen}
        name="Chat"
        options={{ headerShown: false }}
      />
      <Stack.Screen component={AppointmentsScreen} name="Appointments" />
      <Stack.Screen
        component={ScannedPrescriptionModal}
        name="ScannedPrescriptionModal"
      />
      <Stack.Screen
        name="ViewPrescription"
        component={ViewPrescription}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="IotStack"
        component={IotStackProvider}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
