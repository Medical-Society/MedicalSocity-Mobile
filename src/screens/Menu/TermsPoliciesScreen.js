import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SafeScrollView from "../../components/SafeScrollView";
import Header from "../../components/Header";

const TermsPolicies = ({ navigation }) => {
  const data = [
    {
      title: "Terms of Service: ",
      content: [
        "▪ Service Description: Our system transforms your medical experience by offering effortless online booking for doctor appointments, real-time tracking of vital signs like heart rate and oxygen pulse, convenient digitization of prescriptions, a personalized calendar for managing medications and appointments, seamless communication with your doctors, and an AI chatbot that provides instant answers to your health-related questions. This integrated platform not only streamlines scheduling and health monitoring but also facilitates direct interaction with healthcare providers and ensures immediate access to reliable medical guidance whenever you need it.",
        "▪ User Responsibilities: Users are required to maintain respectful communication with doctors, Users are required to maintain respectful communication when setting a review.",
      ],
    },
    {
      title: "Privacy Policy: ",
      content: [
        "▪ Data Collection: Name, Contact details, Health information.",
        "▪ Data Usage: To provide the services, To improve the services.",
        "▪ Data Sharing: Questions posed to the AI chatbot may be reviewed by Chat GPT to provide intelligent responses.",
        "▪ Data Security: encryption, secure servers.",
        "▪ User Rights: Users can utilize our platform to book appointments, engage with an AI chatbot for inquiries, communicate directly with doctors, and scan and upload prescriptions seamlessly.",
      ],
    },
    {
      title: "Booking and Cancellation Policies: ",
      content: [
        "▪ Booking Process: The process involves selecting a doctor, tapping to book an appointment, filling out the necessary form, and you're all set.",
        "Cancellation and Rescheduling: If a user wants to cancel an appointment, they can navigate to the 'Your Appointments' section in the menu, locate the chosen appointment card, and tap on the 'Cancel Appointment' option. After canceling the appointment, users can then proceed to visit the doctor's page again to book another appointment if needed.",
        "▪ Confirmation: It would appear at the notification page for users to review.",
      ],
    },
    {
      title: "Medical Disclaimer:",
      /*
        Service Limitations: The platform is a booking service and not a healthcare provider.
      */
      content: [
        "▪ Service Limitations: The platform is a booking service and not a healthcare provider.",
      ],
    },
    {
      title: "Complaints and Feedback:",
      content: [
        "▪ Procedure: User can set a review after booking with doctor.",
        "▪ Response Time: If users are communicating with a doctor, responses will be provided within 24 hours. For interactions with the AI chatbot, answers are provided immediately.",
      ],
    },
  ];
  return (
    <SafeScrollView
      header={
        <Header
          title="Terms of Service"
          backButtonHandler={navigation.goBack}
        />
      }>
      <View style={styles.container}>
        {data.map((item, index) => (
          <View key={index}>
            <Text style={styles.header}>{item.title}</Text>
            {item.content.map((content, index) => (
              <Text style={styles.text} key={index}>
                {content}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </SafeScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: "Cairo-Bold",    
  },
  text: {
    fontSize: 16,
    fontFamily: "Cairo-Medium",
    lineHeight: 24,
    color: "#000",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default TermsPolicies;
