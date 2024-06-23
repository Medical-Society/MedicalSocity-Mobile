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
import profile from "../../../assets/profile.png";
import menu from "../../../assets/menu.png";
import close from "../../../assets/close.png";
import MainTab from "../mainTab/MainTab";
import TabButton from "./TabButton";
import { colors } from "../../../AppStyles";

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

  const hideMenu = () => {
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
  };

  return (
    <View style={styles.container}>
      <View>
        <Animated.View style={[styles.animatedView]}>
          <TouchableOpacity onPress={hideMenu}>
            <Image source={showMenu ? close : menu} style={styles.menuIcon} />
          </TouchableOpacity>
          <MainTab setSelectTabInChild={setSelectTabInChild} />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BlueI,
    height: "100%",
  },
  userInfoContainer: {
    justifyContent: "flex-start",
    padding: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginTop: Constants.statusBarHeight,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
  },
  settingsText: {
    marginTop: 6,
    color: "white",
  },
  tabButtonsContainer: {
    flexGrow: 1,
    marginVertical: 50,
  },

  menuIcon: {
    width: 20,
    height: 20,
    tintColor: "#000",
    marginTop: 40,
    marginLeft: 20,
  },
});
