import io from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:8080";

export const createSocketConnection = () => {
  return io(SOCKET_URL, {
    withCredentials: true,
  });
};