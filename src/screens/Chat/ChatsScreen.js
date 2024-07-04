import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../../AppStyles";
import SearchBar from "../../components/Search/SearchBar";
import SafeFlatListView from "../../components/SafeFlatListView";
import chatsApi from "../../services/chats";
import { Context as AuthContext } from "../../context/AuthContext";
import { Image } from "expo-image";
import { blurhash } from "../../../AppStyles";

const messagesDataBuilder = (chats) => {
  return chats.map((chat) => {
    const lastMessage = chat.messages[chat.messages.length - 1];
    const messageInQueue = chat.messages.filter(
      (message) => !message.seen && message.userId === chat.doctor._id
    ).length;
    const lastMessageTime = new Date(lastMessage.createdAt).toLocaleTimeString(
      "en-US",
      {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }
    );
    return {
      chatId: chat._id,
      fullName: chat.doctor.englishFullName,
      userImage: chat.doctor.avatar,
      doctorId: chat.doctor._id,
      lastMessage: lastMessage.text,
      lastMessageTime,
      messageInQueue,
    };
  });
};

const ChatsScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const { state } = useContext(AuthContext);
  const { token, socket } = state;

  const getChats = useCallback(async () => {
    try {
      const response = await chatsApi.get("/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setChats(messagesDataBuilder(response.data.data.chats));
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  useEffect(() => {
    getChats();
  }, [getChats]);

  useEffect(() => {
    const subscriber = navigation.addListener("focus", () => {
      getChats();
    });
    return subscriber;
  }, [getChats, navigation]);

  useEffect(() => {
    if (socket) {
      socket.on("listen message", ({ _id, text, createdAt, userId }) => {
        console.log("listen message", _id, text, createdAt, userId);
        setChats((previousChats) => {
          const newChats = previousChats.map((chat) => {
            if (chat.doctorId === userId) {
              return {
                ...chat,
                lastMessage: text,
                lastMessageTime: new Date(createdAt).toLocaleTimeString(
                  "en-US",
                  {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  }
                ),
                messageInQueue:
                  chat.messageInQueue === 0 ? 1 : chat.messageInQueue + 1,
              };
            }
            return chat;
          });
          return newChats;
        });
      });
    }
  }, [socket]);

  const handleSearch = (text) => {
    setTerm(text);
    if (text.length === 0) {
      setResults([]);
    }

    const filteredChats = chats.filter((chat) => {
      return chat.fullName.toLowerCase().includes(text.toLowerCase());
    });

    setResults(filteredChats);
  };

  const renderItem = ({ item, index }) => {
    console.log("item", item);
    return (
      <TouchableOpacity
        key={index}
        onPress={() => navigation.navigate("Chat", { chatId: item.chatId })}
        style={[
          styles.userContainer,
          index % 2 !== 0 ? styles.oddBackground : styles.evenBackground,
        ]}>
        <View style={styles.userImageContainer}>
          <Image
            source={item.userImage}
            style={styles.userImage}
            placeholder={{ blurhash }}
            transition={500}
            contentFit="contain"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <View style={styles.userInfoContainer}>
            <Text style={styles.userName}>{item.fullName}</Text>
            <Text style={styles.lastSeen}>{item.lastMessage}</Text>
          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              height: 50,
            }}>
            <Text
              style={{
                ...styles.lastMessageTime,
                fontFamily: item.messageInQueue ? "Cairo-Bold" : "Cairo-Medium",
                color: item.messageInQueue ? colors.BlueI : colors.Black,
              }}>
              {item.lastMessageTime}
            </Text>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: item.messageInQueue
                  ? colors.BlueI
                  : "transparent",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Text style={styles.messageInQueue}>{item.messageInQueue}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    return (
      <FlatList
        data={results.length > 0 && term.length > 0 ? results : chats}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        style={{ flex: 1 }}
      />
    );
  };

  return (
    <SafeFlatListView
      header={
        <SearchBar
          term={term}
          onTermChange={setTerm}
          setResults={setResults}
          onTermSubmit={
            term.length > 0 ? () => handleSearch(term) : () => setResults([])
          }
          placeholder="Search for a chat"
        />
      }>
      {renderContent()}
    </SafeFlatListView>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: colors.Grey,
    borderBottomWidth: 1,
  },
  oddBackground: {
    backgroundColor: colors.White,
  },
  evenBackground: {
    backgroundColor: colors.White,
  },
  userImageContainer: {
    paddingVertical: 15,
    marginRight: 22,
  },

  onLineIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.Green,
    position: "absolute",
    top: 14,
    right: 2,
    zIndex: 999,
    borderWidth: 2,
    borderColor: colors.White,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfoContainer: {
    flexDirection: "column",
  },
  userName: {
    fontSize: 14,
    fontFamily: "Cairo-Bold",
    marginBottom: 4,
  },
  lastSeen: {
    fontSize: 12,
    fontFamily: "Cairo-Regular",
    color: colors.Grey,
  },
  lastMessageTime: {
    fontSize: 12,
    fontFamily: "Cairo-Medium",
    color: colors.Black,
  },
  messageInQueue: {
    fontSize: 12,
    fontFamily: "Cairo-Regular",
    color: colors.White,
  },
});

export default ChatsScreen;
