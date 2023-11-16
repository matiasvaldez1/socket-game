import Head from "next/head";

const CustomHead = ({
  title,
  description,
  keywords,
}: {
  title: string;
  description?: string;
  keywords?: string;
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content={description ?? "Multiplayer shooter real time game"}
      />
      <meta name="keywords" content={keywords ?? "Online shooter game"} />
      <link
        href="https://fonts.googleapis.com/css?family=Press+Start+2P"
        rel="stylesheet"
      />
      <link href="https://unpkg.com/nes.css/css/nes.css" rel="stylesheet" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default CustomHead;
