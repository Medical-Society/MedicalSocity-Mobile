import React, { lazy } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Profile = lazy(() => import("../../screens/Profile/Profile"));
const EditProfile = lazy(() => import("../../screens/Profile/EditProfile"));
const NotificationsSettings = lazy(() =>
  import("../../screens/Profile/NotificationsSettings")
);
const HelpSupport = lazy(() => import("../../screens/Profile/HelpSupport"));
const TermsPolicies = lazy(() => import("../../screens/Profile/TermsPolicies"));
const ReportProblem = lazy(() => import("../../screens/Profile/ReportProblem"));

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
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
      <Stack.Screen name="ReportProblem" component={ReportProblem} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
