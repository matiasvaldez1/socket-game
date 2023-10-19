import Head from "next/head";

import { api } from "@/utils/api";

export default function Home() {
  //const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Socket game</title>
        <meta name="description" content="A Multiplayer socket game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1>Socket game</h1>
      </main>
    </>
  );
}
