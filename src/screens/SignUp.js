import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import Button from "../components/auth/SubmitButton";
import InputField from "../components/auth/InputField";
import HaveAccOrNot from "../components/auth/HaveAccOrNot";
import OrLine from "../components/auth/OrLine";
import { Context as AuthContext } from "../context/AuthContext";
import MessagesModal from "../components/auth/MessagesModal";
import { RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = ({ navigation }) => {
  const { signup, clearMessage, state } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const initialSignUpData = {
    patientName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthdate: new Date(),
    gender: "",
    address: "",
    phoneNumber: "",
  };
  const [signUpData, setSignUpData] = useState(initialSignUpData);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      clearMessage();
      setSignUpData(initialSignUpData);
    });
    return unsubscribe;
  }, [navigation]);

  // useEffect(() => {
  //   console.log(signUpData);
  // }, [signUpData]);

  const handleInputChange = useCallback((fieldName, text) => {
    setSignUpData((prevState) => ({ ...prevState, [fieldName]: text }));
  }, []);

  const handleSignUp = useCallback(() => {
    signup(signUpData, navigation, setIsLoading);
  }, [signup, signUpData, isLoading]);

  const inputsData = [
    {
      label: "Name",
      placeholder: "Enter your name",
      value: signUpData.patientName,
      onChangeText: (text) => handleInputChange("patientName", text),
    },
    {
      label: "Email",
      placeholder: "Enter your email",
      value: signUpData.email,
      onChangeText: (text) => handleInputChange("email", text),
    },
    {
      label: "Password",
      placeholder: "Enter your password",
      value: signUpData.password,
      onChangeText: (text) => handleInputChange("password", text),
      secureTextEntry: true,
    },
    {
      label: "Confirm Password",
      placeholder: "Enter your password again",
      value: signUpData.confirmPassword,
      onChangeText: (text) => handleInputChange("confirmPassword", text),
      secureTextEntry: true,
    },
    {
      label: "Phone Number",
      placeholder: "Enter your phone number",
      value: signUpData.phoneNumber,
      onChangeText: (text) => handleInputChange("phoneNumber", text),
    },
  ];

  const signupInputs = inputsData.map((input, index) => {
    return (
      <InputField
        key={index}
        label={input.label}
        placeholder={input.placeholder}
        value={input.value}
        onChangeText={input.onChangeText}
        secureTextEntry={input.secureTextEntry}
      />
    );
  });

  const GenderInput = () => {
    const gender = signUpData.gender;
    return (
      <View style={styles.genderContainer}>
        <Text style={styles.label}>Select Gender:</Text>
        <RadioButton.Group
          onValueChange={(newValue) => handleInputChange("gender", newValue)}
          value={gender}
        >
          <View style={styles.genderSelectors}>
            <View style={styles.radioButtonContainer}>
              <RadioButton.Android value="MALE" color="#6200EE" />
              <Text style={styles.radioButtonText}>Male</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton.Android value="FEMALE" color="#6200EE" />
              <Text style={styles.radioButtonText}>Female</Text>
            </View>
          </View>
        </RadioButton.Group>
      </View>
    );
  };

  const [isPickerShow, setIsPickerShow] = useState(false);
  const showPicker = () => {
    setIsPickerShow((prev) => !prev);
  };

  const onChange = (event, value) => {
    if (event.type === "set") {
      if (Platform.OS === "android") setIsPickerShow(false);
      setSignUpData((prevState) => ({ ...prevState, birthdate: value }));
    } else if (Platform.OS !== "ios") {
      setIsPickerShow(false);
    }
  };

  const DatePicker = () => {
    return (
      <>
        <View style={styles.pickedDateContainer}>
          <TouchableOpacity style={styles.pickedDate} onPress={showPicker}>
            <Text style={styles.dateText}>
              {signUpData.birthdate
                .toDateString()
                .split(" ")
                .slice(1)
                .join(" ")}
            </Text>
          </TouchableOpacity>
        </View>

        {isPickerShow && (
          <DateTimePicker
            value={signUpData.birthdate}
            mode={"date"}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            is24Hour={true}
            onChange={onChange}
            style={styles.datePicker}
          />
        )}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.head}>SignUp</Text>
      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        {signupInputs}
        <GenderInput />
        <DatePicker />
        <Button
          onPress={handleSignUp}
          buttonText="SignUp"
          isLoading={isLoading}
        />

        <HaveAccOrNot
          text="Already have an account?"
          routeName="Login"
          navigation={navigation}
        />
        {state.errorMessage || state.successMessage ? (
          <MessagesModal
            errorMessage={state.errorMessage}
            successMessage={state.successMessage}
            clearMessage={clearMessage}
          />
        ) : null}

        {/* <OrLine /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight,
  },
  head: {
    fontSize: 25,
    textAlign: "center",
    color: "#128393",
    fontFamily: "Cairo-Medium",
    marginBottom: 20,
  },
  form: {
    marginHorizontal: 15,
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  successMessage: {
    fontSize: 16,
    color: "green",
    textAlign: "center",
  },
  genderContainer: {
    marginBottom: 20,
    flexDirection: "column",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#6200EE",
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 8,
  },
  genderSelectors: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  pickedDateContainer: {
    padding: 20,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  pickedDate: {
    fontSize: 18,
    color: "black",
  },
  btnContainer: {
    padding: 30,
  },
  // This only works on iOS
  datePicker: {
    width: 320,
    height: 260,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  dateText: {
    fontSize: 18,
    color: "black",
  },
});

export default React.memo(SignUp);
