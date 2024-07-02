import { io } from "socket.io-client";
import { useContext, useEffect, useRef } from "react";
import AuthContext from "../context/AuthContext";

const useSocket = () => {
  const { token } = useContext(AuthContext);
  const socket = useRef(null);

  useEffect(() => {
    if (token) {
      socket.current = io("https://chat-58to.onrender.com/");

      socket.current.on("connect", () => {
        console.log("connected");
        socket.current.emit("join rooms", token);
        console.log("joined rooms", token);
      });

      return () => {
        socket.current.disconnect();
      };
    }
  }, [token]);

  const sendMessage = (message, chatId) => {
    if (socket.current) {
      socket.current.emit("send message", { token, chatId, message });
    }
  };

  return { sendMessage, socket: socket.current };
};

export default useSocket;
