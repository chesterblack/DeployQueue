import { socket } from "@/socket";
import { Dispatch, SetStateAction } from "react";

export function setupSocketIo(
  setIsConnected: Dispatch<SetStateAction<boolean>>
) {
  if (socket.connected) {
    onConnect();
  }

  function onConnect() {
    setIsConnected(true);
  }

  function onDisconnect() {
    setIsConnected(false);
  }

  socket.on("connect", onConnect);
  socket.on("disconnect", onDisconnect);

  return () => {
    socket.off("connect", onConnect);
    socket.off("disconnect", onDisconnect);
  };
}