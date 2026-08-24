"use client";

import { socket } from "@/socket";
import { Submission } from "@/types";
import { SubmitEvent, useEffect, useState } from "react";


export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [ received, setReceived ] = useState<Submission[]>([]);

  const [ title, setTitle ] = useState<string>('');
  const [ link, setLink ] = useState<string>('');
  const [ message, setMessage ] = useState<string>('');

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

  socket.on('new deploy', (m) => {
    setReceived( [...received, m] );
  });

  function submitForm( event: SubmitEvent<HTMLFormElement> ) {
    event.preventDefault();
    const submission: Submission = { title, link, message };
    socket.emit('new deploy', submission);
  }

  return (
    <div>
      <p>
        Status: { isConnected ? "connected" : "disconnected" }
      </p>

      <div>
        {received.map( ( submission: Submission ) => (
          <div key={submission.title}>
            <h2>{submission.title}</h2>
            <a href={submission.link}>{submission.link}</a>
            <p>{submission.message}</p>
          </div>
        ))}
      </div>

      <form onSubmit={submitForm}>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={ title }
          onChange={ e => setTitle( e.target.value ) }
        />
        <input
          type="text"
          name="link"
          placeholder="link"
          value={ link }
          onChange={ e => setLink( e.target.value ) }
        />
        <textarea
          name="message"
          placeholder="message"
          value={ message }
          onChange={ e => setMessage( e.target.value ) }
        />
        <button type="submit">send</button>
      </form>
    </div>
  );
}