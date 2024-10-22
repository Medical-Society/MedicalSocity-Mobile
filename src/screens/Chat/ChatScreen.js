import React, { useEffect, useContext, useState, useCallback } from "react";
import SafeFlatListView from "../../components/SafeFlatListView";
import Header from "../../components/Header";
import { Context as AuthContext } from "../../context/AuthContext";
import chatsApi from "../../services/chats";
import { GiftedChat } from "react-native-gifted-chat";
import { useFocusEffect } from "@react-navigation/native";

const ChatScreen = ({ navigation, route }) => {
  const { chatId } = route.params;
  const { state } = useContext(AuthContext);
  const { token, socket } = state;
  const [doctor, setDoctor] = useState({});
  const [patient, setPatient] = useState({});
  const [messages, setMessages] = useState([]);

  const getChatById = useCallback(async () => {
    try {
      const response = await chatsApi.get(`/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const buildMessages = response.data.data.messages.map((message) => ({
        _id: message._id,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.userId,
          avatar: message.userAvatar,
        },
      }));

      setDoctor(response.data.data.doctor);
      setPatient(response.data.data.patient);
      setMessages(buildMessages.reverse());
    } catch (error) {
      console.log("Failed to fetch chat data:", error);
    }
  }, [chatId, token]);

  useFocusEffect(
    useCallback(() => {
      console.log("Chat screen focused");
      getChatById();

      return () => {
        getChatById();
      };
    }, [getChatById])
  );

  useEffect(() => {
    if (socket) {
      const messageListener = ({ _id, text, createdAt, userId }) => {
        const newMessage = {
          _id,
          text,
          createdAt: new Date(createdAt),
          user: {
            _id: userId,
            name: doctor?.englishFullName || "MSS Doctor",
            avatar: doctor.avatar || "",
          },
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, newMessage)
        );
      };

      socket.on("listen message", messageListener);

      return () => {
        socket.off("listen message", messageListener);
      };
    }
  }, [socket]);

  const onSend = (newMessages) => {
    if (socket && newMessages.length > 0) {
      socket.emit("send message", {
        chatId,
        message: newMessages[0].text,
      });
    }
  };

  return (
    <SafeFlatListView
      header={
        <Header
          title={
            doctor?.englishFullName
              ? `Dr/ ${doctor?.englishFullName}`
              : "MSS Doctor"
          }
          backButtonHandler={() => navigation.goBack()}
        />
      }
      marginBottom={0}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: patient._id,
          name: patient.patientName,
          avatar: patient.avatar,
        }}
      />
    </SafeFlatListView>
  );
};

export default ChatScreen;
