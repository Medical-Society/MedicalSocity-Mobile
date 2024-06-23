import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { colors } from "../../../AppStyles";

const TabButton = ({
  navigation,
  currentTab,
  setCurrentTab,
  title,
  icon,
  signout,
}) => {
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
      }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 8,
          backgroundColor: currentTab == title ? colors.White : "transparent",
          paddingLeft: 13,
          paddingRight: 35,
          borderRadius: 8,
          marginTop: 15,
        }}>
        <Text>{icon}</Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            paddingLeft: 15,
            color: currentTab == title ? "#5359D1" : "white",
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default TabButton;
