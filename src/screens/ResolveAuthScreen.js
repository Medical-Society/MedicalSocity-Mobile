import React, { useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import { useFonts } from "expo-font";

const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext);

  const [fontsLoaded] = useFonts({
    "Cairo-Black": require("../../assets/fonts/Cairo-Black.ttf"),
    "Cairo-Bold": require("../../assets/fonts/Cairo-Bold.ttf"),
    "Cairo-ExtraBold": require("../../assets/fonts/Cairo-ExtraBold.ttf"),
    "Cairo-Light": require("../../assets/fonts/Cairo-Light.ttf"),
    "Cairo-ExtraLight": require("../../assets/fonts/Cairo-ExtraLight.ttf"),
    "Cairo-Medium": require("../../assets/fonts/Cairo-Medium.ttf"),
    "Cairo-Regular": require("../../assets/fonts/Cairo-Regular.ttf"),
    "Cairo-SemiBold": require("../../assets/fonts/Cairo-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      tryLocalSignin();
    }
  }, [fontsLoaded]);

  return null;
};

export default ResolveAuthScreen;
