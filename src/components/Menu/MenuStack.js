import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Menu from "../../screens/Menu/MenuScreen";
import EditProfile from "../../screens/Menu/YouAccountScreen";
import ReportProblemScreen from "../../screens/Menu/ReportProblemScreen";
import TermsPoliciesScreen from "../../screens/Menu/TermsPoliciesScreen";
import ContactUs from "../../screens/Menu/ContactUs";
import AboutUs from "../../screens/Menu/AboutUsScreen";

const Stack = createNativeStackNavigator();

const MenuStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Menu">
      <Stack.Screen name="Menu" component={Menu} />

      <Stack.Screen name="TermsAndPolicies" component={TermsPoliciesScreen} />
      <Stack.Screen name="ReportProblem" component={ReportProblemScreen} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
    </Stack.Navigator>
  );
};

export default MenuStack;
