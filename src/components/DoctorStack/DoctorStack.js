import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DoctorScreen from "../../screens/Doctor/DoctorScreen";
import AppointmentsScreen from "../../screens/Doctor/AppointmentsScreen";
import ReviewsScreen from "../../screens/Doctor/ReviewsScreen";
const Stack = createNativeStackNavigator();

const DoctorStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Doctor" component={DoctorScreen} />
      <Stack.Screen name="Appointments" component={AppointmentsScreen} />
      <Stack.Screen name="Reviews" component={ReviewsScreen} />
    </Stack.Navigator>
  );
};

export default DoctorStack;