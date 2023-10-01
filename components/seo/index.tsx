import React from "react";
import Head from "next/head";

interface IHead {
  title: string;
  description: string;
  image?: string;
}

const index = ({ title, description, image }: IHead) => {
  image = image ? image : "/favicon-32x32.png";
  title = `${title} | MeChat`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        property="og:url"
        content="https://x51dfr1f-3000.asse.devtunnels.ms/"
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:domain"
        content="x51dfr1f-3000.asse.devtunnels.ms"
      />
      <meta
        property="twitter:url"
        content="https://x51dfr1f-3000.asse.devtunnels.ms/"
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
};

export default index;
