import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../AppStyles";

const SafeScrollView = ({ children, header, marginBottom = 60 }) => {
  return (
    <SafeAreaView style={styles.container}>
      {header}
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            ...styles.marginedContainer,
            marginBottom: marginBottom,
          }}>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.White,
  },
  scrollContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  marginedContainer: {
    flex: 1,
  },
});

export default SafeScrollView;
