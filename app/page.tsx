"use client";

import { socket } from "@/socket";
import { useEffect, useState } from "react";


export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [ message, setMessage ] = useState('');
  const [ received, setReceived ] = useState<string[]>([]);

  socket.on('chat message', (m) => {
    setReceived( [...received, m] );
  });

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  function sendMessage() {
    console.log('Sending message: ', message);
    socket.emit('chat message', message);
  }

  return (
    <div>
      <p>
        Status: { isConnected ? "connected" : "disconnected" }
      </p>

      <div>
        {received}
      </div>

      <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={sendMessage}>send</button>
    </div>
  );
}