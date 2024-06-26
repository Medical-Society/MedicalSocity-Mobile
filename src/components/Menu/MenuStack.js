import React, { lazy } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../../../AppStyles";

const Menu = lazy(() => import("../../screens/Menu/MenuScreen"));
const EditProfile = lazy(() => import("../../screens/Menu/YouAccountScreen"));
const NotificationsSettings = lazy(() =>
  import("../../screens/Menu/NotificationsSettings")
);
const HelpSupportScreen = lazy(() =>
  import("../../screens/Menu/HelpSupportScreen")
);
const ReportProblemScreen = lazy(() =>
  import("../../screens/Menu/ReportProblemScreen")
);
const TermsPoliciesScreen = lazy(() =>
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
    </Stack.Navigator>
  );
};

export default MenuStack;
