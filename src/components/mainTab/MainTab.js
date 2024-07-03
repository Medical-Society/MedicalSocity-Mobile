import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Context as UserContext } from "../../context/UserContext";
import { View, Text, StyleSheet, Platform } from "react-native";
import MenuStack from "../Menu/MenuStack";
import HomeStack from "../home/HomeStack";
import AiChatbot from "../../screens/Chat/AiChatbot";
import { colors, responsiveWidth } from "../../../AppStyles";
import { Ionicons } from "@expo/vector-icons";
import ChatsScreen from "../../screens/Chat/ChatsScreen";
import HomeIcon from "../../../assets/SvgIcons/HomeIcon";
import CalendarIcon from "../../../assets/SvgIcons/CalendarIcon";
import ChatsIcon from "../../../assets/SvgIcons/ChatsIcon";
import AiIcon from "../../../assets/SvgIcons/AiIcon";
import Calendar from "../../screens/Calendar";

const Tab = createBottomTabNavigator();
/* eslint-disable react/display-name */

const MenuIcon = React.memo(({ patientName }) => {
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

const MainTab = () => {
  const { state } = useContext(UserContext);
  const patientName = state.userData.patientName;

  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
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
      }}>
      <Tab.Screen
        name="MenuStack"
        component={MenuStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <MenuIcon
              focused={focused}
              width={27}
              height={26}
              patientName={patientName}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <ChatsIcon focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Ai"
        component={AiChatbot}
        options={{
          tabBarStyle: { display: "none", zIndex: -50 },
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.BlueII,
                height: Platform.OS === "ios" ? 70 : 60,
                width: Platform.OS === "ios" ? 70 : 60,
                top: Platform.OS === "ios" ? -30 : -20,
                borderRadius: Platform.OS === "ios" ? 35 : 30,
                borderWidth: 3,
                borderColor: "transparent",
              }}>
              <AiIcon />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarIcon: ({ focused }) => <CalendarIcon focused={focused} />,
        }}
      />

      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => <HomeIcon focused={focused} />,
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
