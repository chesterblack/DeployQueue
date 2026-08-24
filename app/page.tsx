"use client";

import { useEffect, useState } from "react";
import { setupSocketIo } from "./lib";
import NewDeployForm from "./components/NewDeployForm";
import Queue from "./components/Queue";
import { SessionProvider } from "next-auth/react"


export default function Home() {
  const [ isConnected, setIsConnected ] = useState<boolean>( false );

  useEffect( () => { setupSocketIo( setIsConnected ) }, [] );

  if ( !isConnected ) {
    return <div>Loading...</div>
  }

  return (
    <>
      <main>
        <SessionProvider>
          <NewDeployForm />
          <Queue />
        </SessionProvider>
      </main>
    </>
  );
}