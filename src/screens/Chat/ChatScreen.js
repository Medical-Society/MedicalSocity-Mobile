import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SafeFlatListView from "../../components/SafeFlatListView";
import Header from "../../components/Header";
import io from "socket.io-client";
import { Context as AuthContext } from "../../context/AuthContext";
import chatsApi from "../../services/chats";
import { GiftedChat } from "react-native-gifted-chat";

const ChatScreen = ({ navigation, route }) => {
  const chatId = route.params.chatId;
  const [socket, setSocket] = useState();
  const { state } = useContext(AuthContext);
  const { token } = state;
  const [doctor, setDoctor] = useState({});
  const [patient, setPatient] = useState({});
  const [messages, setMessages] = useState([]);

  const getChatById = async () => {
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
            name: message.userName,
            avatar: message.userAvatar,
          },
        };
      });
      setDoctor(response.data.data.doctor);
      setPatient(response.data.data.patient);
      setMessages(buildMessages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const socket = io("https://chat-58to.onrender.com/");
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("connected");
        socket.emit("join rooms", token);
        console.log("joined rooms", token);
      });

      socket.on("listen message", ({ message }) => {
        const newMessage = {
          _id: Math.random() * 1000000,
          text: message,
          createdAt: new Date(message.createdAt),
          user: {
            _id: doctor._id,
            name: message.userName,
            avatar: message.userAvatar,
          }
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, newMessage)
        );
      });
    }
  }, [socket]);

  useEffect(() => {
    console.log("messages", messages);
  }, [messages]);

  useEffect(() => {
    getChatById();
  }, []);

  const onSend = (newMessages) => {
    console.log("newMessages", newMessages[0]);
    socket.emit("send message", {
      token,
      chatId,
      message: newMessages[0].text,
    });
    setMessages(
      GiftedChat.append(messages, {
        _id: Math.random() * 1000000,
        text: newMessages[0].text,
        createdAt: new Date(),
        user: {
          _id: patient._id,
          name: patient.englishFullName,
          avatar: patient.avatar,
        },
      })
    );
  };

  return (
    <SafeFlatListView
      header={
        <Header title="Chat" backButtonHandler={() => navigation.goBack()} />
      }></SafeFlatListView>
  );
};

const styles = StyleSheet.create({});

export default ChatScreen;
