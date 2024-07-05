import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../AppStyles";

const SafeScrollView = ({
  children,
  header,
  marginBottom = 60,
  alignItems = "stretch",
  justifyContent = "flex-start",
}) => {
  return (
    <SafeAreaView style={styles.container}>
      {header}
      {children && (
        <ScrollView
          contentContainerStyle={{
            ...styles.scrollContainer,
            alignItems: alignItems,
            // check if justifyContent is not empty
            justifyContent: justifyContent ? justifyContent : "flex-start",
          }}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              ...styles.marginedContainer,
              marginBottom: marginBottom,
            }}>
            {children}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.White,
  },
  scrollContainer: {
    flexGrow: 1,
    marginHorizontal: 10,
  },
  marginedContainer: {
    flex: 1,
  },
});

export default SafeScrollView;
