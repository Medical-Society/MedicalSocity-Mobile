import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SafeFlatListView = ({ children, header, marginBottom = 60 }) => {
  return (
    <SafeAreaView style={styles.container}>
      {header}
      <View style={styles.mainContainer}>
        <View
          style={{
            ...styles.marginedContainer,
            marginBottom: marginBottom,
          }}>
          {children}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  marginedContainer: {
    flex: 1,
  },
});

export default SafeFlatListView;
