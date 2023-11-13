import Head from "next/head";
import { io } from "socket.io-client";
import { signIn, useSession } from "next-auth/react";

export const socket = io({
  path: "/api/socket",
  closeOnBeforeunload: false,
});

export default function Home() {
  const { data } = useSession();
  const sendPing = () => {
    socket.emit("ping");
  };
  return (
    <>
      <Head>
        <title>Socket game</title>
        <meta name="description" content="A Multiplayer socket game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <h1 className="text-3xl text-white">Socket game</h1>
        <button onClick={() => signIn("google", { callbackUrl: "/" })}>
          login
        </button>
        <button onClick={sendPing}>Send Ping</button>
        {data?.user?.name}
      </main>
    </>
  );
}
