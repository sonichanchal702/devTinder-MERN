import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io("http://localhost:8080"); // ← /users nahi!
  } else {
    return io("/", { path: "/api/socket.io" });
  }
};