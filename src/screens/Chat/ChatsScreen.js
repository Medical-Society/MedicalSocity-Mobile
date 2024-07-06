import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { colors, responsiveFontSize } from "../../../AppStyles";
import SearchBar from "../../components/Search/SearchBar";
import SafeFlatListView from "../../components/SafeFlatListView";
import chatsApi from "../../services/chats";
import { Context as AuthContext } from "../../context/AuthContext";
import { Image } from "expo-image";
import uuid from "react-native-uuid";

const messagesDataBuilder = (chats) => {
  return chats.map((chat) => {
    const lastMessage = chat.messages[chat.messages.length - 1];
    const messageInQueue = chat.messages.filter(
      (message) => !message.seen && message.userId !== chat.patient._id
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
      fullName: chat.doctor?.englishFullName || "MSS Doctor",
      userImage:
        chat.doctor?.avatar ||
        "https://bangkokmentalhealthhospital.com/wp-content/themes/bangkok-mental-health/images/blank-doctors.jpg",
      doctorId: chat.doctor?._id || `${uuid.v4()}`,
      isOnline: true,
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
  const [loading, setLoading] = useState(false);

  const getChats = async () => {
    setLoading(true);
    try {
      const response = await chatsApi.get("/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setChats(messagesDataBuilder(response.data.data.chats));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  useEffect(() => {
    setChats([]);
    const unsubscribe = navigation.addListener("focus", () => {
      getChats();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (socket) {
      const messageListener = ({ _id, text, createdAt, userId }) => {
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
      };
      socket.on("listen message", messageListener);

      return () => {
        socket.off("listen message", messageListener);
      };
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

  const renderContent = () => {
    return (
      <>
        <FlatList
          data={results.length > 0 && term.length > 0 ? results : chats}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("Chat", { chatId: item?.chatId })
                }
                style={[
                  styles.userContainer,
                  index % 2 !== 0
                    ? styles.oddBackground
                    : styles.evenBackground,
                ]}>
                <View style={styles.userImageContainer}>
                  <Image
                    source={{
                      uri: item?.userImage,
                    }}
                    contentFit="cover"
                    style={styles.userImage}
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
                    <Text style={styles.userName}>{item?.fullName}</Text>
                    <Text style={styles.lastSeen}>
                      {item?.lastMessage.length > 30
                        ? item?.lastMessage.slice(0, 30) + "..."
                        : item?.lastMessage}
                    </Text>
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
                        fontFamily: item?.messageInQueue
                          ? "Cairo-Bold"
                          : "Cairo-Medium",
                        color: item?.messageInQueue
                          ? colors.BlueI
                          : colors.Black,
                      }}>
                      {item?.lastMessageTime}
                    </Text>
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: item?.messageInQueue
                          ? colors.BlueI
                          : "transparent",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                      <Text style={styles.messageInQueue}>
                        {item?.messageInQueue}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          style={{ flex: 1 }}
        />
      </>
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
      {!loading && chats.length === 0 && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Cairo-Bold",
              color: colors.Black,
            }}>
            No chats found
          </Text>
        </View>
      )}
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
    justifyContent: "center",
    flex: 1,
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
    overflow: "hidden",
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
