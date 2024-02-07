import { Text, StyleSheet } from "react-native";
const HaveAccOrNot = ({type}) => {
    
    return (
        <Text style={styles.haveAccOrNot}>
          {type === "login" ? "Don't have an account?" : "Already have an account?"}
            <Text style={{ color: "#128393" }} onPress={() => alert("SignUp")}>
                {type === "login" ? " Sign Up" : " Login"}
            </Text>
        </Text>
    );
    };
    
    const styles = StyleSheet.create({
        haveAccOrNot: {
            textAlign: "left",
            marginBottom: 10,
            fontSize: 16,
            color: "#7B7B7B",
        },
    });
    export default HaveAccOrNot;