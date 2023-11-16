import React from "react";
import { signOut } from "next-auth/react";
import { socket } from "@/pages";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Title from "@/components/ui/Title";

export default function HomePage() {
  const sendPing = () => {
    socket.emit("ping");
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex flex-col gap-28">
        <Title type="default" className="text-3xl">
          Socket game
        </Title>
        <div>
          <Button>Create room</Button>
          <div className="flex">
            <Input type="text" placeholder="Room number" />
            <Button>Join</Button>
          </div>
          <button onClick={sendPing}>Send Ping</button>
          <Button type="cancel" onClick={() => signOut()}>
            Sign out
          </Button>
        </div>
      </div>
    </main>
  );
}
