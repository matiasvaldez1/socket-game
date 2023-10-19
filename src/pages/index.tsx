import Head from "next/head";
import { io } from "socket.io-client";

export const socket = io({
  path: "/api/socket",
  closeOnBeforeunload: false,
});

export default function Home() {
  
  return (
    <>
      <Head>
        <title>Socket game</title>
        <meta name="description" content="A Multiplayer socket game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="text-white text-3xl">Socket game</h1>
      </main>
    </>
  );
}
