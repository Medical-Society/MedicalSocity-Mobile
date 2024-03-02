import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Context as UserContext } from "../../context/UserContext";
import { Context as AuthContext } from "../../context/AuthContext";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import profile from "../../../assets2/profile.png";

import menu from "../../../assets2/menu.png";
import close from "../../../assets2/close.png";

import MainTab from "../mainTab/MainTab";

export default function Drawer() {
  const [currentTab, setCurrentTab] = useState("HomeStack");
  const [showMenu, setShowMenu] = useState(false);
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const [selectTabInChild, setSelectTabInChild] = useState("HomeStack");
  const { state, updateUserDataServer, postImage } = useContext(UserContext);
  const { signout } = useContext(AuthContext);
  const { userData } = state;
  const navigation = useNavigation();

  useEffect(() => {
    if (selectTabInChild) {
      setCurrentTab(selectTabInChild);
    }
  }, [selectTabInChild]);

  return (
    <View style={styles.container}>
      <View>
        <View style={{ justifyContent: "flex-start", padding: 15 }}>
          <Image
            source={{
              uri: userData.avatar,
            }}
            style={{
              width: 60,
              height: 60,

              borderRadius: 10,
              marginTop: Constants.statusBarHeight,
            }}
          />

          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
              marginTop: 20,
            }}
          >
            {userData.patientName}
          </Text>

          <TouchableOpacity>
            <Text
              style={{
                marginTop: 6,
                color: "white",
              }}
            >
              View Profile
            </Text>
          </TouchableOpacity>

          <View style={{ flexGrow: 1, marginTop: 50 }}>
            {TabButton(
              navigation,
              currentTab,
              setCurrentTab,
              "HomeStack",
              <AntDesign
                name="home"
                size={30}
                color={currentTab == "HomeStack" ? "#5359D1" : "white"}
              />
            )}
            {TabButton(
              navigation,
              currentTab,
              setCurrentTab,
              "ProfileStack",
              <AntDesign
                name="user"
                size={30}
                color={currentTab == "ProfileStack" ? "#5359D1" : "white"}
              />
            )}
            {TabButton(
              navigation,
              currentTab,
              setCurrentTab,
              "Notifications",
              <Ionicons
                name="notifications"
                size={30}
                color={currentTab == "Notifications" ? "#5359D1" : "white"}
              />
            )}
            {TabButton(
              navigation,
              currentTab,
              setCurrentTab,
              "Calendar",
              <AntDesign
                name="calendar"
                size={30}
                color={currentTab == "Calendar" ? "#5359D1" : "white"}
              />
            )}
          </View>

          <View>
            {TabButton(
              navigation,
              currentTab,
              setCurrentTab,
              "LogOut",
              <MaterialIcons name="logout" size={30} color="white" />,
              signout
            )}
          </View>
        </View>

        <Animated.View
          style={{
            flexGrow: 1,
            backgroundColor: "#fff",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: showMenu ? 15 : 0,
            transform: [{ scale: scaleValue }, { translateX: offsetValue }],

            height: Dimensions.get("window").height,
            width: Dimensions.get("window").width,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Animated.timing(scaleValue, {
                toValue: showMenu ? 1 : 0.88,
                duration: 300,
                useNativeDriver: true,
              }).start();

              Animated.timing(offsetValue, {
                toValue: showMenu ? 0 : 230,
                duration: 300,
                useNativeDriver: true,
              }).start();

              Animated.timing(closeButtonOffset, {
                toValue: !showMenu ? -30 : 0,
                duration: 300,
                useNativeDriver: true,
              }).start();

              setShowMenu(!showMenu);
            }}
          >
            <Image
              source={showMenu ? close : menu}
              style={{
                width: 20,
                height: 20,
                tintColor: "#000",
                marginTop: 40,
                marginLeft: 20,
              }}
            />
          </TouchableOpacity>
          <MainTab setSelectTabInChild={setSelectTabInChild} />
        </Animated.View>

        {/* Render the screen based on the selected tab */}
      </View>
    </View>
  );
}

const TabButton = (
  navigation,
  currentTab,
  setCurrentTab,
  title,
  icon,
  signout
) => {
  //   if navigation channged, the currentTab will be updated

  return (
    <TouchableOpacity
      onPress={() => {
        if (title == "LogOut") {
          signout();
        } else {
          // navigate to Profile screen
          setCurrentTab(title);
          navigation.dispatch(
            CommonActions.navigate({
              name: title,
              params: {
                title: title,
              },
            })
          );
        }
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 8,
          backgroundColor: currentTab == title ? "white" : "transparent",
          paddingLeft: 13,
          paddingRight: 35,
          borderRadius: 8,
          marginTop: 15,
        }}
      >
        <Text>{icon}</Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            paddingLeft: 15,
            color: currentTab == title ? "#5359D1" : "white",
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5359D1",
    height: "100%",
  },
});
