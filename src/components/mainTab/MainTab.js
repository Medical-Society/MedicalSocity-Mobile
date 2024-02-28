import React, { useState, useMemo } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../screens/Home";
import Profile from "../../screens/Profile/Profile";
import { getPathDown } from "./curve";
import { Svg, Path, Rect, G, ClipPath } from "react-native-svg";

import { scale } from "react-native-size-scaling";
import {
  View,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
} from "react-native";
import Calendar from "../../screens/Calendar";
import Notifications from "../../screens/Notifications";
import ProfileStack from "../profile/ProfileStack";
import HomeStack from "../home/HomeStack";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  activeIcon: {
    fontWeight: "bold",
  },
  inactiveIcon: {
    fontWeight: "normal",
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },
  inactiveText: {
    color: "#fff",
    fontWeight: "normal",
    marginBottom: 5,
  },
});

const ProfileIcon = React.memo(
  ({ width, height, focused, setSelectTabInChild }) => {
    return (
      <Svg width={width} height={height} viewBox="0 0 32 32" fill="none">
        <Path
          d="M15.9485 15.5259C14.6693 15.5259 13.6013 15.0974 12.7443 14.2354C11.8873 13.3834 11.4588 12.3139 11.4588 11.0318C11.4588 9.74983 11.8873 8.68174 12.7443 7.82759C13.6013 6.97345 14.6693 6.54639 15.9485 6.54639C17.2277 6.54639 18.2958 6.97345 19.1528 7.82759C20.0098 8.68174 20.4383 9.74983 20.4383 11.0318C20.4383 12.3139 20.0098 13.3834 19.1528 14.2354C18.2958 15.0974 17.2277 15.5259 15.9485 15.5259ZM5.98071 23.9653V22.9941C5.98071 22.3012 6.16573 21.6856 6.53576 21.1475C6.90578 20.6094 7.39097 20.1957 7.99133 19.9067C9.35182 19.2773 10.7026 18.8039 12.0135 18.4864C13.3245 18.1689 14.6351 18.0102 15.9483 18.0102C17.2604 18.0102 18.5698 18.1712 19.8764 18.4933C21.183 18.8153 22.5197 19.2884 23.8866 19.9127C24.5026 20.2013 24.9949 20.6138 25.3535 21.1501C25.7321 21.6865 25.9163 22.3012 25.9163 22.9941V23.9653C25.9163 24.4325 25.7506 24.8318 25.419 25.1633C25.0875 25.4949 24.6881 25.6607 24.221 25.6607H7.67608C7.20894 25.6607 6.80959 25.4949 6.47804 25.1633C6.14649 24.8318 5.98071 24.4325 5.98071 23.9653ZM7.65049 23.9909H24.2466V22.9941C24.2466 22.6737 24.1476 22.3597 23.9496 22.0821C23.7517 21.7944 23.4906 21.5662 23.1662 21.3975C21.9133 20.7858 20.7023 20.3466 19.5333 20.08C18.3542 19.8133 17.1693 19.68 15.9485 19.68C14.7277 19.68 13.5268 19.8133 12.3459 20.08C11.1649 20.3466 9.95534 20.7858 8.71715 21.3975C8.39284 21.5662 8.13399 21.7944 7.93559 22.0821C7.74719 22.3597 7.65049 22.6737 7.65049 22.9941V23.9909ZM15.9485 13.8561C16.7454 13.8561 17.4146 13.5853 17.9561 13.0438C18.4977 12.5022 18.7685 11.833 18.7685 11.0351C18.7685 10.2393 18.4977 9.57004 17.9561 9.02848C17.4146 8.48694 16.7454 8.21617 15.9485 8.21617C15.1517 8.21617 14.4825 8.48694 13.9359 9.02848C13.3993 9.57004 13.1286 10.2393 13.1286 11.0351C13.1286 11.833 13.3993 12.5022 13.9359 13.0438C14.4825 13.5853 15.1517 13.8561 15.9485 13.8561Z"
          fill={focused ? "#fff" : "#C9D7FE"}
          style={focused ? styles.activeIcon : styles.inactiveIcon}
        />
      </Svg>
    );
  }
);

const NotificationIcon = React.memo(
  ({ width, height, focused, setSelectTabInChild }) => {
    return (
      <Svg width={width} height={height} viewBox="0 0 32 32" fill="none">
        <ClipPath id="clip-path">
          <Rect width="31.8971" height="31.8971" fill="#D9D9D9" />
        </ClipPath>
        <G clipPath="url(#clip-path)">
          <Path
            d="M16.8434 28.8301C16.182 28.8301 15.6167 28.5949 15.1473 28.1244C14.6778 27.6539 14.4431 27.0884 14.4431 26.4277H19.2481C19.2481 27.0905 19.0126 27.6566 18.5417 28.126C18.0708 28.5954 17.5047 28.8301 16.8434 28.8301ZM7.71271 25.0986C7.47617 25.0986 7.27788 25.0182 7.11787 24.8573C6.95783 24.6964 6.87781 24.4971 6.87781 24.2593C6.87781 24.0214 6.95783 23.8235 7.11787 23.6657C7.27788 23.5078 7.47617 23.4288 7.71271 23.4288H9.28032V13.1253C9.28032 11.3298 9.82827 9.73321 10.9242 8.33552C12.02 6.93783 13.4351 6.06234 15.1843 5.70906V4.98356C15.1843 4.52259 15.3457 4.13035 15.6685 3.80733C15.9912 3.48428 16.3831 3.32275 16.8441 3.32275C17.2839 3.32275 17.6582 3.4678 17.967 3.75788C18.2758 4.04797 18.4513 4.35274 18.4933 4.82219V4.87671C18.2604 5.24645 18.0696 5.63266 17.9208 6.03534C17.7719 6.43802 17.6666 6.85831 17.6047 7.2962C17.4773 7.26894 17.3537 7.25105 17.2338 7.24254C17.1138 7.23352 16.9845 7.22975 16.8456 7.22975C15.2138 7.22975 13.8233 7.8044 12.674 8.95359C11.5247 10.103 10.9501 11.4935 10.9501 13.1253V23.4288H22.7412V14.6835C23.0132 14.7358 23.2895 14.7739 23.5701 14.7977C23.8507 14.8216 24.1309 14.8201 24.4109 14.7935V23.4288H25.9785C26.2151 23.4288 26.4134 23.5093 26.5734 23.6702C26.7334 23.831 26.8134 24.0304 26.8134 24.2682C26.8134 24.506 26.7334 24.7039 26.5734 24.8618C26.4134 25.0197 26.2151 25.0986 25.9785 25.0986H7.71271ZM23.8181 11.9062C22.8473 11.9062 22.0227 11.5664 21.3443 10.8869C20.6659 10.2074 20.3267 9.38229 20.3267 8.41157C20.3267 7.43586 20.6664 6.61629 21.3459 5.93785C22.0254 5.25942 22.8505 4.9202 23.8213 4.9202C24.792 4.9202 25.6165 5.25995 26.295 5.93945C26.9734 6.61894 27.3126 7.44356 27.3126 8.4148C27.3126 9.38551 26.9729 10.2101 26.2934 10.8885C25.6139 11.567 24.7888 11.9062 23.8181 11.9062Z"
            fill={focused ? "#fff" : "#C9D7FE"}
            style={focused ? styles.activeIcon : styles.inactiveIcon}
          />
        </G>
      </Svg>
    );
  }
);
const HomeIcon = React.memo(
  ({ width, height, focused, setSelectTabInChild }) => {
    return (
      <Svg width={width} height={height} viewBox="0 0 32 32" fill="none">
        <ClipPath id="clip-path">
          <Rect width="31.8971" height="31.8971" fill="#D9D9D9" />
        </ClipPath>
        <G clipPath="url(#clip-path)">
          <Path
            d="M7.94944 25.5755H12.8823V18.5554C12.8823 18.2609 12.9819 18.0141 13.1811 17.8149C13.3803 17.6157 13.6272 17.5161 13.9217 17.5161H18.5733C18.8678 17.5161 19.1146 17.6157 19.3138 17.8149C19.513 18.0141 19.6127 18.2609 19.6127 18.5554V25.5755H24.5455V13.3301C24.5455 13.262 24.5306 13.2002 24.5008 13.1448C24.4709 13.0895 24.4305 13.0355 24.3793 12.9978L16.4903 7.06688C16.4221 7.01292 16.3412 6.98594 16.2475 6.98594C16.1538 6.98594 16.0728 7.01292 16.0047 7.06688L8.11561 12.9978C8.06448 13.0355 8.02351 13.0895 7.9942 13.1448C7.96435 13.2002 7.94944 13.262 7.94944 13.3301V25.5755ZM6.27966 25.5755V13.333C6.27966 13 6.35191 12.6876 6.4964 12.3959C6.63586 12.1041 6.84692 11.8627 7.11457 11.6717L15.0035 5.72507C15.352 5.44677 15.7747 5.30762 16.2419 5.30762C16.7091 5.30762 17.1256 5.44677 17.4913 5.72507L25.3804 11.6717C25.648 11.8627 25.8541 12.1041 25.9986 12.3959C26.143 12.6876 26.2153 13 26.2153 13.333V25.5755C26.2153 26.03 26.0506 26.4219 25.7213 26.7513C25.3919 27.0806 25 27.2453 24.5455 27.2453H18.9823C18.6878 27.2453 18.4359 27.1457 18.2417 26.9465C18.0425 26.7473 17.9429 26.5004 17.9429 26.2059V19.1859H14.5521V26.2059C14.5521 26.5004 14.4525 26.7473 14.2532 26.9465C14.054 27.1457 13.8072 27.2453 13.5127 27.2453H7.94944C7.49495 27.2453 7.10304 27.0806 6.7737 26.7513C6.44434 26.4219 6.27966 26.03 6.27966 25.5755Z"
            fill={focused ? "#fff" : "#C9D7FE"}
            style={focused ? styles.activeIcon : styles.inactiveIcon}
          />
        </G>
      </Svg>
    );
  }
);
const CalendarIcon = React.memo(
  ({ width, height, focused, setSelectTabInChild }) => {
    return (
      <Svg width={width} height={height} viewBox="0 0 32 32" fill="none">
        <ClipPath id="clip-path">
          <Rect width="31.8971" height="31.8971" fill="#D9D9D9" />
        </ClipPath>
        <G clipPath="url(#clip-path)">
          <Path
            d="M7.13253 28.5746C6.56131 28.5746 6.07204 28.3709 5.66473 27.9635C5.25743 27.5563 5.05377 27.067 5.05377 26.4958V7.73587C5.05377 7.16465 5.25743 6.67538 5.66473 6.26807C6.07204 5.86079 6.56131 5.65714 7.13253 5.65714H9.38171V4.06564C9.38171 3.81315 9.46629 3.60065 9.63546 3.42817C9.8046 3.25568 10.0157 3.16943 10.2687 3.16943C10.528 3.16943 10.7446 3.25568 10.9185 3.42817C11.0924 3.60065 11.1793 3.81315 11.1793 4.06564V5.65714H21.5731V4.04248C21.5731 3.79123 21.6561 3.5829 21.8221 3.4175C21.9882 3.25212 22.1943 3.16943 22.4355 3.16943C22.6929 3.16943 22.904 3.25276 23.0735 3.41943C23.2432 3.58609 23.3281 3.79298 23.3281 4.03509V5.65714H25.5687C26.14 5.65714 26.6292 5.86079 27.0355 6.26807C27.4438 6.67538 27.6475 7.16465 27.6475 7.73587V26.4958C27.6475 27.067 27.4438 27.5563 27.0355 27.9635C26.6292 28.3709 26.14 28.5746 25.5687 28.5746H7.13253ZM7.13253 26.9048H25.5687C25.671 26.9048 25.7647 26.8622 25.8499 26.777C25.9351 26.6918 25.9777 26.5981 25.9777 26.4958V13.5377H6.72355V26.4958C6.72355 26.5981 6.76616 26.6918 6.85137 26.777C6.93556 26.8622 7.03028 26.9048 7.13253 26.9048ZM6.72355 11.8679H25.9777V7.73587C25.9777 7.63354 25.9351 7.53993 25.8499 7.45471C25.7647 7.35952 25.671 7.32692 25.5687 7.32692H7.13253C7.03028 7.32692 6.93556 7.35952 6.85137 7.45471C6.76616 7.53993 6.72355 7.63354 6.72355 7.73587V11.8679ZM16.3506 18.709C16.0252 18.709 15.7479 18.5944 15.5187 18.3552C15.2895 18.1351 15.175 17.8588 15.175 17.5333C15.175 17.2079 15.2895 16.9306 15.5187 16.7014C15.7479 16.4722 16.0252 16.3577 16.3506 16.3577C16.6761 16.3577 16.9534 16.4722 17.1825 16.7014C17.4117 16.9306 17.5263 17.2079 17.5263 17.5333C17.5263 17.8588 17.4117 18.1351 17.1825 18.3552C16.9534 18.5944 16.6761 18.709 16.3506 18.709ZM11.0344 18.709C10.709 18.709 10.4317 18.5944 10.2025 18.3552C9.97335 18.1351 9.85877 17.8588 9.85877 17.5333C9.85877 17.2079 9.97335 16.9306 10.2025 16.7014C10.4317 16.4722 10.709 16.3577 11.0344 16.3577C11.3599 16.3577 11.6372 16.4722 11.8664 16.7014C12.0955 16.9306 12.2101 17.2079 12.2101 17.5333C12.2101 17.8588 12.0955 18.1351 11.8664 18.3552C11.6372 18.5944 11.3599 18.709 11.0344 18.709ZM21.6668 18.709C21.3414 18.709 21.0641 18.5944 20.8349 18.3552C20.6057 18.1351 20.4911 17.8588 20.4911 17.5333C20.4911 17.2079 20.6057 16.9306 20.8349 16.7014C21.0641 16.4722 21.3414 16.3577 21.6668 16.3577C21.9923 16.3577 22.2696 16.4722 22.4987 16.7014C22.7279 16.9306 22.8425 17.2079 22.8425 17.5333C22.8425 17.8588 22.7279 18.1351 22.4987 18.3552C22.2696 18.5944 21.9923 18.709 21.6668 18.709ZM16.3506 23.923C16.0252 23.923 15.7479 23.8084 15.5187 23.5792C15.2895 23.35 15.175 23.0727 15.175 22.7473C15.175 22.4218 15.2895 22.1445 15.5187 21.9154C15.7479 21.6862 16.0252 21.5716 16.3506 21.5716C16.6761 21.5716 16.9534 21.6862 17.1825 21.9154C17.4117 22.1445 17.5263 22.4218 17.5263 22.7473C17.5263 23.0727 17.4117 23.35 17.1825 23.5792C16.9534 23.8084 16.6761 23.923 16.3506 23.923ZM11.0344 23.923C10.709 23.923 10.4317 23.8084 10.2025 23.5792C9.97335 23.35 9.85877 23.0727 9.85877 22.7473C9.85877 22.4218 9.97335 22.1445 10.2025 21.9154C10.4317 21.6862 10.709 21.5716 11.0344 21.5716C11.3599 21.5716 11.6372 21.6862 11.8664 21.9154C12.0955 22.1445 12.2101 22.4218 12.2101 22.7473C12.2101 23.0727 12.0955 23.35 11.8664 23.5792C11.6372 23.8084 11.3599 23.923 11.0344 23.923ZM21.6668 23.923C21.3414 23.923 21.0641 23.8084 20.8349 23.5792C20.6057 23.35 20.4911 23.0727 20.4911 22.7473C20.4911 22.4218 20.6057 22.1445 20.8349 21.9154C21.0641 21.6862 21.3414 21.5716 21.6668 21.5716C21.9923 21.5716 22.2696 21.6862 22.4987 21.9154C22.7279 22.1445 22.8425 22.4218 22.8425 22.7473C22.8425 23.0727 22.7279 23.35 22.4987 23.5792C22.2696 23.8084 21.9923 23.923 21.6668 23.923Z"
            fill={focused ? "#fff" : "#C9D7FE"}
            style={focused ? styles.activeIcon : styles.inactiveIcon}
          />
        </G>
      </Svg>
    );
  }
);

const MainTab = ({ setSelectTabInChild }) => {
  const [maxWidth, setMaxWidth] = useState(Dimensions.get("window").width + 1);
  const returnPathDown = getPathDown(maxWidth, 60, 50);
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarStyle: {
          height: 50,
          position: "absolute",
          backgroundColor: Platform.OS !== "ios" ? "transparent" : "#041E3F",
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="ProfileStack"
        listeners={{
          tabPress: (e) => {
            setSelectTabInChild("ProfileStack");
          },
        }}
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            margin: 0,
            backgroundColor: "#041E3F",
          },
          tabBarIcon: ({ focused }) => (
            <ProfileIcon
              setSelectTabInChild={setSelectTabInChild}
              focused={focused}
              width={35}
              height={35}
            />
          ),

          tabBarIconStyle: {
            marginBottom: Platform.OS === "ios" ? 20 : 0,
          },
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? styles.activeText : styles.inactiveText}>
              Profile
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        listeners={{
          tabPress: (e) => {
            setSelectTabInChild("Notifications");
          },
        }}
        component={Notifications}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            margin: 0,
            backgroundColor: "#041E3F",
          },
          tabBarIcon: ({ focused }) => (
            <NotificationIcon
              setSelectTabInChild={setSelectTabInChild}
              width={35}
              height={35}
              focused={focused}
            />
          ),
          tabBarIconStyle: {
            marginBottom: Platform.OS === "ios" ? 20 : 0,
          },
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? styles.activeText : styles.inactiveText}>
              Notification
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Ai"
        component={Profile}
        options={{
          headerShown: false,
          unmountOnBlur: false,
          tabBarItemStyle: {
            margin: 0,
            zIndex: -50,
          },
          tabBarIcon: () => (
            <View
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "center",
                alignItems: "center",
                height: 56,
                width: 56,
                backgroundColor: "#041E3F",
                borderRadius: 35,
              }}
            >
              <Image
                style={{
                  width: 50,
                  height: 50,
                }}
                source={require("../../../assets/ai.png")}
              />
            </View>
          ),
          tabBarLabel: () => (
            <View>
              <Svg width={maxWidth} height={scale(60)}>
                <Path fill={"#041E3F"} {...{ d: returnPathDown }} />
              </Svg>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        listeners={{
          tabPress: (e) => {
            setSelectTabInChild("Calendar");
          },
        }}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            margin: 0,
            backgroundColor: "#041E3F",
          },
          tabBarIcon: ({ focused }) => (
            <CalendarIcon
              setSelectTabInChild={setSelectTabInChild}
              width={35}
              height={35}
              focused={focused}
            />
          ),

          tabBarIconStyle: {
            marginBottom: Platform.OS === "ios" ? 20 : 0,
          },
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? styles.activeText : styles.inactiveText}>
              Calendar
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        listeners={{
          tabPress: (e) => {
            setSelectTabInChild("HomeStack");
          },
        }}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            margin: 0,
            backgroundColor: "#041E3F",
          },
          tabBarIcon: ({ focused }) => (
            <HomeIcon
              setSelectTabInChild={setSelectTabInChild}
              width={35}
              height={35}
              focused={focused}
            />
          ),

          tabBarIconStyle: {
            marginBottom: Platform.OS === "ios" ? 20 : 0,
          },
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? styles.activeText : styles.inactiveText}>
              Home
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
