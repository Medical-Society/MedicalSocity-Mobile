import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import { useFonts } from "expo-font";
import AnimatedTyping from "../components/Splash/AnimatedTyping";
import { LinearGradient } from "expo-linear-gradient";
const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext);

  const [introFinished, setIntroFinished] = useState(false);

  const [mainFontLoaded] = useFonts({
    Cinzel: require("../../assets/fonts/CinzelDecorative-Regular.ttf"),
  });

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
    if (fontsLoaded && introFinished) {
      tryLocalSignin();
    }
  }, [fontsLoaded, introFinished]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#060B73", "#040740"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.background}>
        {mainFontLoaded && (
          <AnimatedTyping
            text={["Medical Society"]}
            onComplete={() => setIntroFinished(true)}
          />
        )}
      </LinearGradient>
    </View>
  );
};

export default ResolveAuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
