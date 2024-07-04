import React, { useState, useCallback, useEffect, useContext } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../../components/Header";
import { Context as AuthContext } from "../../context/AuthContext";
import aiApi from "../../services/Ai";
import { colors } from "../../../AppStyles";

const AiChatbot = ({ navigation, route }) => {
  const [messages, setMessages] = useState([]);
  const { state } = useContext(AuthContext);
  const [isTyping, setIsTyping] = useState(false);
  const token = state.token;

  const callChatbot = useCallback(
    async ({ text: message }) => {
      setIsTyping(true);
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
      } finally {
        setIsTyping(false);
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
        placeholder="Type your message here..."
        isTyping={isTyping}
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
    fontSize: 20,
    fontFamily: "Cairo-Bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: colors.White,
    padding: 22,
    borderRadius: 4,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    color: colors.BlueI,
    marginBottom: 10,
  },
});

export default AiChatbot;
