import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrLine = () => {
  return (
    <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>or login using</Text>
        <View style={styles.line} />
    </View>
  );
}


const styles = StyleSheet.create({
    lineContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: "#7B7B7B",
        margin: 10,
    },
    orText: {
        color: "#7B7B7B",
    },
});

export default OrLine;