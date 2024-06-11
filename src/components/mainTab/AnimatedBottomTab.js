import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Calendar from "../../screens/Calendar";
import Notifications from "../../screens/Notifications";
import MenuStack from "../Menu/MenuStack";
import HomeStack from "../home/HomeStack";
import AiChatbot from "../../screens/Chat/AiChatbot";
import { colors, responsiveFontSize } from "../../../AppStyles";
import { MaterialIcons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
const TabArray = [
  { route: "Home", label: "Home", icon: "home", component: HomeStack },
  {
    route: "Calendar",
    label: "Calendar",
    icon: "calendar-month",
    component: Calendar,
  },
  {
    route: "Notifications",
    label: "Notifications",
    icon: "notifications",
    component: Notifications,
  },
  {
    route: "Ai",
    label: "Ai Chatbot",
    icon: "chat",
    component: AiChatbot,
  },
  { route: "Menu", label: "Menu", icon: "menu", component: MenuStack },
];

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.container}>
        <View style={styles.btn}>
          <View style={styles.circle} />
          <MaterialIcons
            name={item.icon}
            size={24}
            color={focused ? colors.White : colors.LightGrey}
          />
        </View>
        <Text style={styles.text}>{item.label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const AnimatedBottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          height: 70,
          bottom: 24,
          right: 16,
          left: 16,
          borderRadius: 16,
          backgroundColor: colors.BlueI,
          borderTopWidth: 1,
        },
      }}>
      {TabArray.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.route}
          component={tab.component}
          options={{
            tabBarShowLabel: false,
            tabBarButton: (props) => <TabButton {...props} item={tab} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  btn: {
    width: 50,
    height: 50,
    borderWidth: 4,
    borderRadius: 25,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: responsiveFontSize(12),
    color: colors.White,
  },
});

export default AnimatedBottomTab;
