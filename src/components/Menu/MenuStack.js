import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Menu from "../../screens/Menu/MenuScreen";
import EditProfile from "../../screens/Menu/YouAccountScreen";
import NotificationsSettings from "../../screens/Menu/NotificationsSettings";
import HelpSupportScreen from "../../screens/Menu/HelpSupportScreen";
import ReportProblemScreen from "../../screens/Menu/ReportProblemScreen";
import TermsPoliciesScreen from "../../screens/Menu/TermsPoliciesScreen";
import PrescriptionsScreen from "../../screens/Menu/PrescriptionsScreen";
import ScannedPrescriptionsScreen from "../../screens/Menu/ScannedPrescriptionsScreen";
import AppointmentsScreen from "../../screens/Menu/AppointmentsScreen";
import ContactUs from "../../screens/Menu/ContactUs";

const Stack = createNativeStackNavigator();

const MenuStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Menu">
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotificationsSettings"
        component={NotificationsSettings}
      />
      <Stack.Screen name="Help&Support" component={HelpSupportScreen} />
      <Stack.Screen name="TermsAndPolicies" component={TermsPoliciesScreen} />
      <Stack.Screen name="ReportProblem" component={ReportProblemScreen} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
    </Stack.Navigator>
  );
};

export default MenuStack;
