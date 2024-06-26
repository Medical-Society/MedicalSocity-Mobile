import { useContext } from "react";
import { io } from "socket.io-client";
import { Context as AuthContext } from "../context/AuthContext";
export const socket = io("https://chat-58to.onrender.com/");

export const useSocket = () => {
  const { state } = useContext(AuthContext);
  const { token } = state;

  socket.on("connect", () => {
    console.log("connected");
    socket.emit("join rooms", token);
    console.log("joined rooms", token);
  });

  return socket;
};

export const sendMessage = (message, chatId) => {
  socket.emit("send message", { token, chatId, message });
};
