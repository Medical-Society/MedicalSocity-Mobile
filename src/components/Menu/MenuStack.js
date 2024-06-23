import React, { lazy } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../../../AppStyles";

const Profile = lazy(() => import("../../screens/Menu/MenuScreen"));
const EditProfile = lazy(() => import("../../screens/Menu/YouAccountScreen"));
const NotificationsSettings = lazy(() =>
  import("../../screens/Menu/NotificationsSettings")
);
const HelpSupport = lazy(() => import("../../screens/Menu/HelpSupportScreen"));
const TermsPolicies = lazy(() =>
  import("../../screens/Menu/TermsPoliciesScreen")
);
const PrescriptionsScreen = lazy(() =>
  import("../../screens/Menu/PrescriptionsScreen")
);
const ScannedPrescriptionsScreen = lazy(() =>
  import("../../screens/Menu/ScannedPrescriptionsScreen")
);
const AppointmentsScreen = lazy(() =>
  import("../../screens/Menu/AppointmentsScreen")
);

const Stack = createNativeStackNavigator();

const MenuStack = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: colors.White,
          paddingBottom: 70,
        },
      }}
      initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotificationsSettings"
        component={NotificationsSettings}
      />
      <Stack.Screen name="Help&Support" component={HelpSupport} />
      <Stack.Screen name="TermsAndPolicies" component={TermsPolicies} />
      <Stack.Screen
        name="Prescriptions"
        component={PrescriptionsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ScannedPrescriptions"
        component={ScannedPrescriptionsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Appointments"
        component={AppointmentsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MenuStack;
