import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DoctorScreen from "../../screens/Doctor/DoctorScreen";
import DoctorAppointmentsScreen from "../../screens/Doctor/DoctorAppointmentsScreen";
import ReviewsScreen from "../../screens/Doctor/ReviewsScreen";
import LatestWorkScreen from "../../screens/Doctor/LatestWorkScreen";
const Stack = createNativeStackNavigator();

const DoctorStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Doctor" component={DoctorScreen} />
      <Stack.Screen
        name="DoctorAppointments"
        component={DoctorAppointmentsScreen}
      />
      <Stack.Screen name="Reviews" component={ReviewsScreen} />
      <Stack.Screen name="LatestWork" component={LatestWorkScreen} />
    </Stack.Navigator>
  );
};

export default DoctorStack;
