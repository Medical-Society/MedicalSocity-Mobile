import React, { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import SafeScrollView from "../../components/SafeScrollView";
import Header from "../../components/Header";
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
      <KeyboardAvoidingView
        style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
        behavior="padding"
        enabled
        keyboardVerticalOffset={100}>
        <View>
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
        </View>
      </KeyboardAvoidingView>
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
