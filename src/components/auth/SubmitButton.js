import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Button = ({ onPress, buttonText }) => (
   <TouchableOpacity onPress={onPress}>
     <LinearGradient
       colors={["#45CCCF", "#006472"]}
       end={[0, 0.5]}
       start={[1, 0.5]}
       style={styles.gradientButton}
     >
       <Text style={styles.buttonText}>{buttonText}</Text>
     </LinearGradient>
   </TouchableOpacity>
);

const styles = StyleSheet.create({
    gradientButton: {
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        borderRadius: 30,
        margin: 10,
      },
      buttonText: {
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
      },
    });

export default Button;