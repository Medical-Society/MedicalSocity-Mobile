import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Perform login logic here
  };

  const InputField = ({
    label,
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
  }) => (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );

  const GradientButton = ({ onPress, buttonText }) => (
    <LinearGradient
      colors={["#45CCCF", "#006472"]}
      end={[0, 0.5]}
      start={[1, 0.5]}
      style={styles.gradientButton}
    >
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.head}>Login</Text>
      <View style={styles.form}>
        <InputField
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />
        <InputField
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Text style={styles.forgetPassword}>Forget your password</Text>
        <GradientButton onPress={handleLogin} buttonText="Login" />
        <Text style={styles.forgetPassword}>
          Don't have an account?
          <Text style={{ color: "#128393" }} onPress={() => alert("SignUp")}>
            {" "}
            Sign Up
          </Text>
        </Text>
        {/* create a line that is centered and cut by "or login using" */}
        <View style={styles.lineContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or login using</Text>
          <View style={styles.line} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  form: {
    paddingHorizontal: 5,
  },
  head: {
    fontSize: 25,
    textAlign: "center",
    margin: 10,
    marginBottom: 50,
    color: "#128393",
    fontWeight: "bold",
  },
  label: {
    marginTop: 10,
    fontSize: 18,
    color: "#7B7B7B",
    fontWeight: "bold",
  },
  input: {
    height: 48,
    margin: 12,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    fontSize: 16,
    borderRadius: 10,
  },
  forgetPassword: {
    textAlign: "left",
    marginBottom: 10,
    fontSize: 16,
    color: "#7B7B7B",
  },
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

export { styles };

export default Login;
