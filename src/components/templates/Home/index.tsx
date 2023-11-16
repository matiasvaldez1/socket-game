import React from "react";
import { signOut, useSession } from "next-auth/react";
import { socket } from "@/pages";

export default function HomePage() {
  const { data } = useSession();
  const sendPing = () => {
    socket.emit("ping");
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div>
        <h1 className="text-3xl text-white">Socket game</h1>
        <button className="nes-text is-primary" onClick={() => signOut()}>
          Sign out
        </button>
        <button onClick={sendPing}>Send Ping</button>
        {data?.user?.name}
      </div>
    </main>
  );
}
