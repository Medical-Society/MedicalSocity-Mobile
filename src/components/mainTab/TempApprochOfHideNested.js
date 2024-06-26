import React, { useState, useMemo, useContext } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../screens/Home";
import { getPathDown } from "./curve";
import { Svg, Path, Rect, G, ClipPath } from "react-native-svg";
import { Context as UserContext } from "../../context/UserContext";
import { scale } from "react-native-size-scaling";

import {
  View,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import Calendar from "../../screens/Calendar";
import Notifications from "../../screens/Notifications";
import MenuStack from "../Menu/MenuStack";
import HomeStack from "../home/HomeStack";
import AiChatbot from "../../screens/Chat/AiChatbot";
import { useNavigation } from "@react-navigation/native";
import { colors, responsiveHeight, responsiveWidth } from "../../../AppStyles";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const getImageNameBased = (name) => {
  switch (name) {
    case "home":
      return require("../../../assets/home.png");
    case "notifications":
      return require("../../../assets/notifications.png");

    case "calendar":
      return require("../../../assets/calendar.png");
  }
};

const Icon = React.memo(({ name, focused }) => {
  return (
    <Image
      style={{
        resizeMode: "contain",
        width: 30,
        height: 30,
        tintColor: focused ? colors.White : colors.LightBlue,
      }}
      source={getImageNameBased(name)}
    />
  );
});

const MenuIcon = React.memo(({ focused, patientName }) => {
  const firstTwoLetters = patientName
    ?.split(" ")
    ?.map((name) => name.charAt(0))
    ?.join("")
    ?.toUpperCase();

  return (
    <View style={styles.menuIcon}>
      <View style={styles.menuNameCircle}>
        <Text style={styles.menuName}>{firstTwoLetters}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Ionicons name="menu" size={14} color="white" />
      </View>
    </View>
  );
});

const toHideTabs = ["Appointments", "Prescriptions", "ScannedPrescriptions"];

function getTabBarVisibility(route) {
  console.log("route", route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? "";

  if (toHideTabs.includes(routeName)) {
    return "none";
  }
  return "flex";
}

const MainTab = () => {
  const [maxWidth, setMaxWidth] = useState(Dimensions.get("window").width + 1);
  const returnPathDown = getPathDown(maxWidth, 60, 50);
  const { state } = useContext(UserContext);
  const patientName = state.userData.patientName;
  console.log("state", state.userData.patientName);
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          display: getTabBarVisibility(route),
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: Platform.OS === "ios" ? 90 : 60,
          borderTopWidth: 0,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          backgroundColor: colors.BlueII,
        },
      })}>
      <Tab.Screen
        name="MenuStack"
        component={MenuStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <MenuIcon
              focused={focused}
              width={35}
              height={35}
              patientName={patientName}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon name="notifications" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Ai"
        component={AiChatbot}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.BlueII,
                height: Platform.OS === "ios" ? 70 : 60,
                width: Platform.OS === "ios" ? 70 : 60,
                top: Platform.OS === "ios" ? -40 : -30,
                borderRadius: Platform.OS === "ios" ? 35 : 30,
                borderWidth: 3,
                borderColor: "transparent",
              }}>
              <Image
                resizeMode="contain"
                source={require("../../../assets/ai.png")}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="calendar" focused={focused} />
          ),
        }}
      />

      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => <Icon name="home" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  activeIcon: {
    fontWeight: "bold",
  },
  inactiveIcon: {
    fontWeight: "normal",
  },
  activeText: {
    color: colors.White,
    fontWeight: "bold",
    marginBottom: 5,
  },
  inactiveText: {
    color: colors.White,
    fontWeight: "normal",
    marginBottom: 5,
  },
  aiIcon: {
    display: "flex",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    width: 56,
    backgroundColor: colors.BlueII,
    borderRadius: 35,
  },
  menuIcon: {
    borderRadius: 50,
  },
  menuNameCircle: {
    width: 40,
    height: 40,
    borderRadius: 35,
    backgroundColor: colors.LightBlue,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  menuName: {
    color: colors.BlueI,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Cairo-Regular",
  },
  menuImageCircle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 35,
    backgroundColor: colors.BlueI,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  menuImage: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
  },
  iconContainer: {
    position: "absolute",
    bottom: -5,
    right: -5,
    backgroundColor: colors.BlueII,
    borderRadius: 12,
    padding: 4,
  },
});
export default MainTab;
