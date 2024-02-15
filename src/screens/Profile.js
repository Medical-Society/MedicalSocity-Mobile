import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { state, signout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={signout} style={styles.btn}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    padding: 10,
    backgroundColor: "lightblue",
    borderRadius: 5,
  },
});

export default Profile;
