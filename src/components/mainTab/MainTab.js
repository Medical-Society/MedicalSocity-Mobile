import React, { useState, useMemo, useContext } from "react";
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
      <View style={styles.menuImageCircle}>
        <Image
          style={styles.menuImage}
          source={require("../../../assets/menu.png")}
        />
      </View>
    </View>
  );
});

const MainTab = () => {
  const [maxWidth, setMaxWidth] = useState(Dimensions.get("window").width + 1);
  const returnPathDown = getPathDown(maxWidth, 60, 50);
  const { state } = useContext(UserContext);
  const patientName = state.userData.patientName;
  console.log("state", state.userData.patientName);
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarStyle: {
          height: responsiveHeight(50),
          position: "absolute",
          backgroundColor:
            Platform.OS !== "ios" ? "transparent" : colors.BlueII,
          borderTopWidth: 0,
        },
        contentStyle: {
          backgroundColor: colors.White,
        },
      }}>
      <Tab.Screen
        name="MenuStack"
        component={MenuStack}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            margin: 0,
            backgroundColor: colors.BlueII,
          },
          tabBarIcon: ({ focused }) => (
            <MenuIcon
              focused={focused}
              width={35}
              height={35}
              patientName={patientName}
            />
          ),

          tabBarIconStyle: {
            marginBottom: Platform.OS === "ios" ? 20 : 0,
          },
          tabBarLabel: ({ focused }) => (
            <Text
              style={focused ? styles.activeText : styles.inactiveText}></Text>
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            margin: 0,
            backgroundColor: colors.BlueII,
          },
          tabBarIcon: ({ focused }) => (
            <Icon name="notifications" focused={focused} />
          ),
          tabBarIconStyle: {
            marginBottom: Platform.OS === "ios" ? 20 : 0,
          },
          tabBarLabel: ({ focused }) => (
            <Text
              style={focused ? styles.activeText : styles.inactiveText}></Text>
          ),
        }}
      />
      <Tab.Screen
        name="Ai"
        component={AiChatbot}
        options={{
          headerShown: false,
          unmountOnBlur: false,
          tabBarItemStyle: {
            margin: 0,
            zIndex: -50,
          },
          tabBarStyle: { display: "none", zIndex: -50 },
          tabBarIcon: ({ focused }) => (
            <View style={styles.aiIcon}>
              <Image
                style={{
                  width: responsiveWidth(50),
                  height: responsiveHeight(50),
                }}
                source={require("../../../assets/ai.png")}
              />
            </View>
          ),
          tabBarLabel: () => (
            <View>
              <Svg width={maxWidth} height={scale(60)}>
                <Path fill={colors.BlueII} {...{ d: returnPathDown }} />
              </Svg>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        listeners={{
          tabPress: (e) => {},
        }}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            margin: 0,
            backgroundColor: colors.BlueII,
          },
          tabBarIcon: ({ focused }) => (
            <Icon name="calendar" focused={focused} />
          ),

          tabBarIconStyle: {
            marginBottom: Platform.OS === "ios" ? 20 : 0,
          },
          tabBarLabel: ({ focused }) => (
            <Text
              style={focused ? styles.activeText : styles.inactiveText}></Text>
          ),
        }}
      />

      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        listeners={{
          tabPress: (e) => {},
        }}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            margin: 0,
            backgroundColor: colors.BlueII,
          },
          tabBarIcon: ({ focused }) => <Icon name="home" focused={focused} />,

          tabBarIconStyle: {
            marginBottom: Platform.OS === "ios" ? 20 : 0,
          },
          tabBarLabel: ({ focused }) => (
            <Text
              style={focused ? styles.activeText : styles.inactiveText}></Text>
          ),
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    left: responsiveWidth(25),
    top: Platform.OS === "ios" ? responsiveHeight(10) : responsiveHeight(30),
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    borderRadius: responsiveWidth(25) / 2,
    backgroundColor: colors.BlueI,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  menuImage: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
  },
});
export default MainTab;
