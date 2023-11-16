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
    </Head>
  );
};

export default CustomHead;
