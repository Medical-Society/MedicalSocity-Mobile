import React from "react";
import { Text } from "react-native";
import SafeScrollView from "../../components/SafeScrollView";
import Header from "../../components/Header";

const ContactUs = ({ navigation }) => {
  return (
    <SafeScrollView
      header={
        <Header
          title="Contact Us"
          backButtonHandler={() => navigation.goBack()}
        />
      }>
      <Text>ContactUs</Text>
    </SafeScrollView>
  );
};


export default ContactUs;
