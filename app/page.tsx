"use client";

import { socket } from "@/socket";
import { Submission } from "@/types";
import { useEffect, useState } from "react";
import { setupSocketIo } from "./lib";
import NewDeployForm from "./components/NewDeployForm";


export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [ received, setReceived ] = useState<Submission[]>([]);

  useEffect( () => { setupSocketIo( setIsConnected ) }, [] );

  socket.on('new deploy', m => {
    setReceived( [ ...received, m ] );
  });

  return (
    <div className="main">
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

      <NewDeployForm />
    </div>
  );
}