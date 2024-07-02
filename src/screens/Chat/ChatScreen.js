import React, { useEffect, useContext, useState, useCallback } from "react";
import SafeFlatListView from "../../components/SafeFlatListView";
import Header from "../../components/Header";
import { Context as AuthContext } from "../../context/AuthContext";
import chatsApi from "../../services/chats";
import { GiftedChat } from "react-native-gifted-chat";

const ChatScreen = ({ navigation, route }) => {
  const chatId = route.params.chatId;
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

      const buildMessages = response.data.data.messages.map((message) => {
        return {
          _id: message._id,
          text: message.text,
          createdAt: new Date(message.createdAt),
          user: {
            _id: message.userId,
            avatar: message.userAvatar,
          },
        };
      });

      setDoctor(response.data.data.doctor);
      setPatient(response.data.data.patient);
      setMessages(buildMessages.reverse());
    } catch (error) {
      console.log(error);
    }
  }, [chatId, token]);

  useEffect(() => {
    getChatById();
  }, [getChatById]);

  useEffect(() => {
    if (socket) {
      socket.on("listen message", ({ _id, text, createdAt, userId }) => {
        const newMessage = {
          _id: _id,
          text,
          createdAt: new Date(createdAt),
          user: {
            _id: userId,
            name: patient.patientName,
            avatar: patient.avatar,
          },
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, newMessage)
        );
      });
    }
  }, [patient.avatar, patient.patientName, socket]);

  const onSend = (newMessages) => {
    console.log("newMessages", newMessages[0]);
    socket.emit("send message", {
      chatId,
      message: newMessages[0].text,
    });
  };

  return (
    <SafeFlatListView
      header={
        <Header
          title={doctor.englishFullName ? `${doctor.englishFullName}` : "Chat"}
          backButtonHandler={() => navigation.goBack()}
        />
      }>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
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
