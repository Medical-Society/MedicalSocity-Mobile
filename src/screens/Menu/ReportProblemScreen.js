import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SafeScrollView from "../../components/SafeScrollView";
import Header from "../../components/Header";
import InputField from "../../components/auth/InputField";
import MultiLineTextInput from "../../components/MultiLineTextInput";
import SubmitButton from "../../components/SubmitButton";
import MessagesModal from "../../components/MessagesModal";
const ReportProblemScreen = ({ navigation }) => {
  const [problem, setProblem] = useState("");
  const [message, setMessage] = useState({
    successMessage: "",
    errorMessage: "",
  });

  const handleSubmit = () => {
    if (problem) {
      setMessage({ successMessage: "Problem reported successfully" });
      setProblem("");
    } else {
      setMessage({ errorMessage: "Please write your problem" });
    }
  };

  return (
    <SafeScrollView
      header={
        <Header
          title="Report a Problem"
          backButtonHandler={() => navigation.goBack()}
        />
      }>
      <View style={styles.reportProblemContainer}>
        <MultiLineTextInput
          placeholder="Write your problem here"
          value={problem}
          handleTextChange={setProblem}
        />
      </View>
      <MessagesModal
        successMessage={message.successMessage}
        errorMessage={message.errorMessage}
        clearMessage={() =>
          setMessage({ successMessage: "", errorMessage: "" })
        }
      />
      <SubmitButton buttonText="Submit" onPress={() => handleSubmit()} />
    </SafeScrollView>
  );
};

const styles = StyleSheet.create({
  reportProblemContainer: {
    flex: 1,
    marginVertical: 20,
  },
});

export default ReportProblemScreen;
