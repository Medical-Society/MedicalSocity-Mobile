import React, { useState, useCallback, useEffect, useContext } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../../components/Header";
import { Context as AuthContext } from "../../context/AuthContext";
import aiApi from "../../services/Ai";
const COLORS = {
  primary: "#242760",
  secondary: "#544C4C",
  white: "#FFFFFF",
  black: "#000000",
  gray: "rgba(36, 39, 96, 0.05)",
  secondaryGray: "rgba(84, 76, 76, 0.14)",
};
const { height, width } = Dimensions.get("window");

const SIZES = {
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,
  padding3: 16,
  largeTitle: 50,
  h1: 30,
  h2: 20,
  h3: 18,
  h4: 16,
  body1: 30,
  body2: 20,
  body3: 18,
  body4: 14,
  body5: 12,
  width,
  height,
};

const FONTS = {
  largeTitle: {
    fontFamily: "black",
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: { fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontSize: SIZES.h4, lineHeight: 20 },
  body1: { fontSize: SIZES.body1, lineHeight: 36 },
  body2: { fontSize: SIZES.body2, lineHeight: 30 },
  body3: { fontSize: SIZES.body3, lineHeight: 22 },
  body4: { fontSize: SIZES.body4, lineHeight: 20 },
};

const AiChatbot = ({ navigation, route }) => {
  const [messages, setMessages] = useState([]);
  const { state } = useContext(AuthContext);
  const token = state.token;

  const callChatbot = useCallback(
    async ({ text: message }) => {
      try {
        const response = await aiApi.post("/message", {
          message: message,
          user_id: token,
        });

        const newMessage = {
          _id:
            Math.floor(Math.random() * Math.floor(Math.random() * 1000000)) +
            Math.floor(Math.random() * 10000000),
          text: response.data.response,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, newMessage)
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error sending message to chatbot:", error);
        throw error;
      }
    },
    [token]
  );

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "I'm your assistant, how can i help you?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Ai Chatbot",
          avatar: require("../../../assets/ai.png"),
        },
      },
    ]);
  }, []);

  const onSend = useCallback(
    (messages = []) => {
      const lastMessage = messages[messages.length - 1];
      callChatbot(lastMessage);
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [callChatbot]
  );

  const handleButton = () => {
    console.log("Printed");
    navigation.navigate("HomeStack", { screen: "Home" });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Chatbot" backButtonHandler={handleButton} />
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginHorizontal: 12,
    flexDirection: "row",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
  headerText: {
    ...FONTS.h3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: 22,
    borderRadius: 4,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    ...FONTS.h3,
  },
});

export default AiChatbot;
