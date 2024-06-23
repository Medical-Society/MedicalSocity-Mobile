import React, { useReducer } from "react";
import { StyleSheet, View } from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import {
  colors,
  margin,
  responsiveHeight,
  responsiveWidth,
} from "../../AppStyles";

const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />;

export default function HelloWorld() {
  const colorMode = "light";

  return (
    <MotiView
      transition={{
        type: "timing",
      }}
      style={[styles.container, styles.padded]}
      animate={{ backgroundColor: colors.White }}>
      <Spacer />
      <View style={styles.main}>
        <Skeleton
          colorMode={colorMode}
          radius="square"
          height={responsiveHeight(96)}
          width={responsiveWidth(72)}
        />
        <View
          style={{
            marginHorizontal: responsiveWidth(15),
          }}>
          <Skeleton
            colorMode={colorMode}
            width="90%"
            height={responsiveHeight(96)}
          />
        </View>
      </View>
      <Spacer />
      <Spacer />

      <Skeleton
        colorMode={colorMode}
        width={"100%"}
        height={responsiveHeight(96)}
      />

      <Spacer height={responsiveHeight(30)} />
      <Skeleton
        colorMode={colorMode}
        width={"100%"}
        radius={50}
        height={responsiveHeight(50)}
      />
      <Spacer />

      <Skeleton
        colorMode={colorMode}
        width={"100%"}
        radius={50}
        height={responsiveHeight(50)}
      />
      <Spacer height={responsiveHeight(30)} />
      <Skeleton
        colorMode={colorMode}
        width={"100%"}
        height={responsiveHeight(200)}
      />
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  padded: {
    padding: 16,
  },
});
